<script lang="ts">
  import {clickOutside} from '$lib/actions/clickOutside';
  import { swipe } from '$lib/actions/swipe';
  import Tag from '$lib/components/Tag.svelte';
  import View from '$lib/components/Icon/View.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import AdditionalOptions from '$lib/components/AdditionalOptions/AdditionalOptions.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Archive from '$lib/components/Icon/Archive.svelte';
  import Activate from '$lib/components/Icon/Activate.svelte';
  import type { ClientType } from '../../../types/DTM';
  import type { ClientStatus } from '../../../enums';
  import { formatToPoundCurrency, sumInvoices } from '$lib/utils/money';
  import ClientForm from './ClientForm.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ConfirmDeleteClient from './ConfirmDeleteClient.svelte';
  import Cancel from '$lib/components/Icon/Cancel.svelte';
  import Send from '$lib/components/Icon/Send.svelte';

  const emptyClient = {} as ClientType;
  let triggerReset = false;
  let isAddClientFormOpen = false;
  let isEditingCurrentClient = false;
  let isDeleteClientModalOpen = false;
  export let isAdditionalOptionsOpen = false;
  export let client: ClientType;

  const handleEditClient = () => {
    isEditingCurrentClient = true;
    openAddClientPanel();
  }

  const handleDelete = () => {
    isDeleteClientModalOpen = true;
    isAdditionalOptionsOpen = false;
  };

  const handleArchive = () => {
    client.clientStatus = 'archived';
    isAdditionalOptionsOpen = false;
  }

  const handleActivate = () => {
    client.clientStatus = 'active';
    isAdditionalOptionsOpen = false;
  }

  const options = [
    { label: 'Edit', icon: Edit, onClick: handleEditClient, disabled: false },
    { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
    { label: 'Archive', icon: Archive, onClick: handleArchive, disabled: client.clientStatus === 'archived' },
    { label: 'Activate', icon: Activate, onClick: handleActivate, disabled: client.clientStatus === 'active' },
  ];

  const onOptionsClick = () => {
    isAdditionalOptionsOpen = !isAdditionalOptionsOpen;
  }

  const clientStatus = client.clientStatus as ClientStatus;


  const receivedInvoices = () => {
    if (!client.invoice.length) {
      return 0;
    }
    const paidInvoices = client.invoice.filter(invoice => invoice.invoiceStatus === 'paid');
    return sumInvoices(paidInvoices);
  }


  const balanceInvoices = () => {
    if (!client.invoice.length) {
      return 0;
    }
    const unpaidInvoices = client.invoice.filter(invoice => invoice.invoiceStatus !== 'paid');
    return sumInvoices(unpaidInvoices);
  }

  const closeAddClientPanel = () => {
    isAddClientFormOpen = false;
  }

  const openAddClientPanel = () => {
    isAddClientFormOpen = true;
  }

</script>

<div class="relative">
  <div
    use:swipe={{ triggerReset }}
    on:outOfView={() => {triggerReset = false}}
    class="client-table client-row rounded-lg bg-white py-3 shadow-tableRow lg:py-6 z-row relative"
  >
    <div class="client-status">
      <Tag
        className="mr-auto"
        label={clientStatus}
      />
    </div>
    <div class="client-name truncate whitespace-nowrap text-base lg:text-xl font-bold">{client.name}</div>
    <div class="client-received">
      {formatToPoundCurrency(receivedInvoices())}
    </div>
    <div class="client-balance text-center font-mono text-sm lg:text-lg font-bold text-scarlet">
      {formatToPoundCurrency(balanceInvoices())}
    </div>
    <div class="view relative hidden lg:center">
      <a href={`/clients/${client.id}`} class="text-pastelPurple hover:text-daisyBush">
        <View />
      </a>
    </div>
    <div class="relative hidden lg:center three-dots" use:clickOutside={() => isAdditionalOptionsOpen = false}>
      <button on:click={onOptionsClick} class="text-pastelPurple hover:text-daisyBush">
        <ThreeDots />
      </button>
      {#if isAdditionalOptionsOpen}
        <AdditionalOptions {options} />
      {/if}
    </div>
  </div>

  <!--  swipe to reveal-->
  <div class="swipe-revealed-actions">
    <button class="swipe-revealed-button" on:click={() => triggerReset = true}>
      <Cancel width={32} height={32} />
      Cancel
    </button>

    <button class="swipe-revealed-button" on:click={handleDelete}>
      <Trash width={32} height={32} />
      Delete
    </button>

    <button class="swipe-revealed-button" on:click={handleEditClient}>
      <Edit width={32} height={32} />
      Edit
    </button>

    {#if client.clientStatus === 'active'}
      <button class="swipe-revealed-button" on:click={handleArchive}>
        <Archive width={32} height={32} />
        Archive
      </button>
    {/if}

    {#if client.clientStatus !== 'active'}
      <button class="swipe-revealed-button" on:click={handleActivate}>
        <Activate width={32} height={32} />
        Activate
      </button>
    {/if}

    <a href={`/clients/${client.id}`} class="swipe-revealed-button">
      <View width={32} height={32} />
      View
    </a>
  </div>
</div>

{#if isAddClientFormOpen}
  <SlidePanel on:closePanel={closeAddClientPanel}>
    <ClientForm
      formStatus={isEditingCurrentClient ? 'edit' : 'create'}
      {closeAddClientPanel}
      client={isEditingCurrentClient ? client : emptyClient}
    />
  </SlidePanel>
{/if}

{#if isDeleteClientModalOpen}
  <ConfirmDeleteClient
    {client}
    isModalShowing={isDeleteClientModalOpen}
    on:close={() => isDeleteClientModalOpen = false}
  />
{/if}

<style lang="postcss">
  .client-row {
    grid-template-areas:
    'clientName status'
    'received balance';
  }

  @media (min-width: 1024px) {
    .client-row {
      grid-template-areas:
      'status clientName received balance view three-dots';
    }
  }

  .client-name {
    grid-area: clientName;
  }

  .client-status {
    grid-area: status;
  }

  .client-received {
    @apply text-left lg:text-center font-mono text-sm lg:text-lg font-bold;
    grid-area: received;
  }

  .client-received::before {
    @apply block lg:hidden font-bold text-xs;
    content: 'Received';
  }

  .client-balance {
    grid-area: balance;
  }

  .client-balance::before {
    @apply block lg:hidden font-bold text-xs;
    content: 'Balance';
  }
</style>
