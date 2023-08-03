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
  import { isLate } from '$lib/utils/date';
  import { page } from '$app/stores';
  import { singleClient, getClientById } from '$lib/stores/clientStore';

  let isEditingCurrentClient = false;
  let isClientFormShowing = false;

  const editClient = () => {
    isEditingCurrentClient = true;
    isClientFormShowing = true;
  };

  const closePanel = () => {
    isClientFormShowing = false;
  };

  const createNewClient = () => {
    isEditingCurrentClient = false;
    isClientFormShowing = true;
  };

  const getDraftAmount = (client: ClientType | undefined) => {
    if (!client?.invoice?.length) {
      return 0;
    }
    const draftInvoices = client?.invoice.filter((invoice) => invoice.invoiceStatus === 'draft');
    const totalDraftAmount = sumInvoices(draftInvoices);
    return formatToPoundCurrency(totalDraftAmount);
  };

  const getPaidAmount = (client: ClientType | undefined) => {
    if (!client?.invoice?.length) {
      return 0;
    }
    const paidInvoices = client?.invoice.filter((invoice) => invoice.invoiceStatus === 'paid');
    const totalPaidAmount = sumInvoices(paidInvoices);
    return formatToPoundCurrency(totalPaidAmount);
  };

  const getOverdueAmount = (client: ClientType | undefined) => {
    if (!client?.invoice?.length) {
      return 0;
    }
    const overdueInvoices = client?.invoice
      .filter((invoice) => invoice.invoiceStatus === 'sent' && isLate(invoice.dueDate));
    const totalOverdueAmount = sumInvoices(overdueInvoices);
    return formatToPoundCurrency(totalOverdueAmount);
  };

  const getOutstandingAmount = (client: ClientType | undefined) => {
    if (!client?.invoice?.length) {
      return 0;
    }
    const outstandingInvoices = client?.invoice
      .filter((invoice) => invoice.invoiceStatus === 'sent' && !isLate(invoice.dueDate));
    const totalOutstandingAmount = sumInvoices(outstandingInvoices);
    return formatToPoundCurrency(totalOutstandingAmount);
  };

  onMount(async () => {
    await loadInvoices();
    const clientId = $page.params.id;
    await getClientById(clientId);
  });

  $: totalAmount = sumInvoices($singleClient?.invoice);
  $: formattedTotalAmount = formatToPoundCurrency(totalAmount);

  const emptyClient = {} as ClientType;
</script>

<svelte:head>
  <title>{$singleClient?.name} | Pound Bill Craft</title>
</svelte:head>

<div class="search">
  {#if Number($singleClient?.invoice?.length) > 0}
    <SearchInput />
  {:else}
    <div />
  {/if}
  <div>
    <Button isAnimated={true} onClick={createNewClient}>+ Client</Button>
  </div>
</div>

<div class="flex justify-between items-center w-full mb-7">
  <h1 class="font-sansSerif text-3xl font-bold text-daisyBush">{$singleClient?.name}</h1>
  <Button variant="text" iconLeft={Edit} onClick={editClient}>Edit</Button>
</div>

<div class="mb-10 flex justify-between flex-wrap lg:grid lg:grid-cols-4 gap-4 rounded-lg bg-gallery py-7 px-10">
  <div class="summary-block">
    <p class="label">Total Overdue</p>
    <p class="number">{getOverdueAmount($singleClient)}</p>
  </div>
  <div class="summary-block">
    <p class="label">Total Outstanding</p>
    <p class="number">{getOutstandingAmount($singleClient)}</p>
  </div>
  <div class="summary-block">
    <p class="label">Total Draft</p>
    <p class="number">{getDraftAmount($singleClient)}</p>
  </div>
  <div class="summary-block">
    <p class="label">Total Pay</p>
    <p class="number">{getPaidAmount($singleClient)}</p>
  </div>
</div>

{#if $singleClient?.invoice === null}
  Loading...
{:else if $singleClient?.invoice?.length === 0}
  <BlankState />
{:else}
  <InvoiceRowHeader className="text-daisyBush" />
  {#each $singleClient?.invoice || [] as invoice}
    <InvoiceRow {invoice} />
  {/each}
  <CircledAmount label="Total:" amount={formattedTotalAmount} />
{/if}

{#if isClientFormShowing}
  <SlidePanel on:closePanel={closePanel}>
    <ClientForm
      closeAddClientPanel={closePanel}
      formStatus={isEditingCurrentClient ? 'edit' : 'create'}
      client={isEditingCurrentClient ? $singleClient : emptyClient}
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

  .label {
    @apply text-sm font-black text-[#a397ad];
  }

  .number {
    @apply text-[2.5rem] font-black text-purple truncate;
  }
</style>
