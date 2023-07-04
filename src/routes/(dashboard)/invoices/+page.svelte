<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/invoiceStore';
  import { onMount } from 'svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from './InvoiceRow.svelte';
  import { formatToPoundCurrency, sumInvoices } from '$lib/utils/money';
  import BlankState from './BlankState.svelte';
  import InvoiceRowHeader from './InvoiceRowHeader.svelte';

  onMount(() => {
    loadInvoices();
  });
  const totalAmount = sumInvoices($invoices);
  const formattedTotalAmount = formatToPoundCurrency(totalAmount);
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
    <button class="btn">+ Invoice</button>
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

  .btn {
    @apply relative
    translate-y-0
    whitespace-nowrap
    rounded-lg
    bg-lavenderIndigo
    px-5
    py-2
    font-sansSerif
    text-base
    font-black
    text-white
    shadow-colored
    transition-all
    hover:-translate-y-0.5
    hover:shadow-coloredHover
    lg:px-10
    lg:py-3
    lg:text-xl;
  }
</style>
