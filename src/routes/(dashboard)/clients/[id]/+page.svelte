<script lang="ts">
  import type { ClientType } from '../../../../types/DTM';
  import { loadInvoices } from '$lib/stores/invoiceStore';
  import { onMount } from 'svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import Button from '$lib/components/Button.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import BlankState from '../../invoices/BlankState.svelte';
  import InvoiceRowHeader from '../../invoices/InvoiceRowHeader.svelte';
  import InvoiceRow from '../../invoices/InvoiceRow.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import { formatToPoundCurrency, sumInvoices } from '$lib/utils/money';
  import ClientForm from '../ClientForm.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';

  export let data: {client: ClientType};

  let isEditingCurrentClient = false;
  let isClientFormShowing = false;

  const editClient = () => {
    isEditingCurrentClient = true;
    isClientFormShowing = true;
  };

  const closePanel = () => {
    isClientFormShowing = false;
  };

  onMount(() => {
    loadInvoices();
  });

  $: totalAmount = sumInvoices(data?.client.invoice);
  $: formattedTotalAmount = formatToPoundCurrency(totalAmount);

  const emptyClient = {} as ClientType;
</script>

<svelte:head>
  <title>{data?.client?.name} | Pound Bill Craft</title>
</svelte:head>

<div class="search">
  {#if data?.client?.invoice?.length > 0}
    <SearchInput />
  {:else}
    <div />
  {/if}
  <div>
    <Button isAnimated={true} onClick={() => (isClientFormShowing = true)}>+ Client</Button>
  </div>
</div>

<div class="flex justify-between items-center w-full mb-7">
  <h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{data?.client?.name}</h1>
  <Button variant="text" iconLeft={Edit} onClick={editClient}>Edit</Button>
</div>

<div class="mb-10 flex justify-between flex-wrap lg:grid lg:grid-cols-4 gap-4 rounded-lg bg-gallery py-7 px-10">
  <div class="summary-block">
    <p class="label">Total Overdue</p>
    <p class="number"><sup>£</sup>300</p>
  </div>
  <div class="summary-block">
    <p class="label">Total Outstanding</p>
    <p class="number"><sup>£</sup>300</p>
  </div>
  <div class="summary-block">
    <p class="label">Total Draft</p>
    <p class="number"><sup>£</sup>300</p>
  </div>
  <div class="summary-block">
    <p class="label">Total Pay</p>
    <p class="number"><sup>£</sup>300</p>
  </div>
</div>

{#if data?.client?.invoice === null}
  Loading...
{:else if data?.client?.invoice.length === 0}
  <BlankState />
{:else}
  <InvoiceRowHeader className="text-daisyBush" />
  {#each data?.client?.invoice as invoice}
    <InvoiceRow {invoice} />
  {/each}
  <CircledAmount label="Total:" amount={formattedTotalAmount} />
{/if}

{#if isClientFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm
      closeAddClientPanel={closePanel}
      formStatus={isEditingCurrentClient ? 'edit' : 'create'}
      client={isEditingCurrentClient ? data?.client : emptyClient}
    />
  </SlidePanel>
{/if}

<style lang="postcss">
  .search {
    @apply mb-7
    flex
    flex-col-reverse
    justify-between
    gap-y-6
    md:flex-row
    md:items-center
    lg:mb-16
    lg:gap-y-4;
  }

  .summary-block {
    @apply text-center;
  }

  .summary-block sup {
    @apply relative -top-[3px];
  }

  .label {
    @apply text-sm font-black text-[#a397ad];
  }

  .number {
    @apply text-[2.5rem] font-black text-purple truncate;
  }
</style>
