<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/invoiceStore';
  import { onMount } from 'svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import { formatToPoundCurrency, sumInvoices } from '$lib/utils/money';
  import BlankState from './BlankState.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';
  import Button from '$lib/components/Button.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';

  let isInvoiceCreateShowing = false;

  onMount(() => {
    loadInvoices();
  });

  $: totalAmount = sumInvoices($invoices);
  $: formattedTotalAmount = formatToPoundCurrency(totalAmount);
</script>

<svelte:head>
  <title>Invoices | Pound Bill Craft</title>
</svelte:head>

<div class="search">
  {#if $invoices.length > 0}
    <SearchInput />
  {:else}
    <div />
  {/if}
  <!--  new invoice button-->
  <div>
    <Button isAnimated={true} onClick={() => (isInvoiceCreateShowing = true)}>+ Invoice</Button>
  </div>
</div>

{#if $invoices === null}
  Loading...
{:else if $invoices.length === 0}
  <BlankState />
{:else}
  <InvoiceRowHeader className="text-daisyBush" />
  {#each $invoices as invoice}
    <InvoiceRow {invoice} />
  {/each}
  <CircledAmount label="Total:" amount={formattedTotalAmount} />
{/if}

{#if isInvoiceCreateShowing}
  <SlidePanel on:closePanel={() => (isInvoiceCreateShowing = false)}>Test</SlidePanel>
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
</style>
