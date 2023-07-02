<script lang="ts">
  import { invoices, loadInvoices } from '$lib/stores/invoiceStore';
  import { onMount } from 'svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import InvoiceRow from './InvoiceRow.svelte';

  onMount(() => {
    loadInvoices();
    console.log($invoices);
  });
</script>

<svelte:head>
  <title>Invoices | Pound Bill Craft</title>
</svelte:head>

<div class="search">
  <SearchInput />
  <!--  new invoice button-->
  <div>
    <button class="btn">+ Invoice</button>
  </div>
</div>

<!--List of invoices-->
<div>
  <header class="table-header lg:invoice-item hidden text-daisyBush">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3 class="text-right">Amount</h3>
    <div />
    <div />
  </header>
</div>

{#each $invoices as invoice}
  <InvoiceRow {invoice} />
{/each}
<CircledAmount label="Total:" amount="£10,251.00" />

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

  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>
