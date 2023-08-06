<script lang="ts">
  // import { invoices, loadInvoices } from '$lib/stores/invoiceStore';
  // import { onMount } from 'svelte';
  // import SearchInput from '$lib/components/SearchInput.svelte';
  // import CircledAmount from '$lib/components/CircledAmount.svelte';
  // import InvoiceRow from './InvoiceRow.svelte';
  // import { formatToPoundCurrency, sumInvoices } from '$lib/utils/money';
  // import BlankState from './BlankState.svelte';
  // import InvoiceRowHeader from './InvoiceRowHeader.svelte';
  // import Button from '$lib/components/Button.svelte';
  // import SlidePanel from '$lib/components/SlidePanel.svelte';
  // import InvoiceForm from './InvoiceForm.svelte';
  // import NoSearchResult from './NoSearchResult.svelte';
  // import type { InvoiceType } from '../../../types/DTM';

  let isInvoiceCreateShowing = false;
  // let initialInvoiceList: InvoiceType[] = [];

  // const handleSearchInvoices = (event: CustomEvent) => {
  //   const keywords = event.detail.searchTerms;
  //   initialInvoiceList = $invoices.filter((invoice) => {
  //     return (
  //       invoice?.client?.name?.toLowerCase().includes(keywords.toLowerCase()) ||
  //       invoice?.client?.email?.toLowerCase().includes(keywords.toLowerCase()) ||
  //       invoice?.invoiceStatus?.toLowerCase().includes(keywords.toLowerCase())
  //     );
  //   });
  // };
  //
  // const handleClearSearch = (event: CustomEvent) => {
  //   if (event.detail.searchTerms === '') {
  //     initialInvoiceList = $invoices;
  //   }
  // };

/*  onMount(async () => {
    // await loadInvoices();
    initialInvoiceList = $invoices;
  });*/

  // $: totalAmount = sumInvoices($invoices);
  // $: formattedTotalAmount = formatToPoundCurrency(totalAmount);
</script>

<!--<svelte:head>
  <title>Invoices | Pound Bill Craft</title>
</svelte:head>

<div class="search">
  {#if $invoices.length > 0}
    <SearchInput
      on:search={handleSearchInvoices}
      on:clear={handleClearSearch}
    />
  {:else }
    <div />
  {/if}
  &lt;!&ndash;  new invoice button&ndash;&gt;
  <div>
    <Button isAnimated={true} onClick={() => (isInvoiceCreateShowing = true)}>+ Invoice</Button>
  </div>
</div>-->

<!--{#if $invoices === null}
  Loading...
{:else if $invoices.length === 0}
  <BlankState />
{:else if initialInvoiceList.length === 0}
  <NoSearchResult />
{:else}
  <InvoiceRowHeader className="text-daisyBush" />
  {#each initialInvoiceList as invoice}
    <InvoiceRow {invoice} />
  {/each}
  <CircledAmount label="Total:" amount={formattedTotalAmount} />
{/if}-->

<!--
{#if isInvoiceCreateShowing}
  <SlidePanel on:closePanel={() => (isInvoiceCreateShowing = false)}>
    <InvoiceForm closePanel={() => (isInvoiceCreateShowing = false)} />
  </SlidePanel>
{/if}
-->

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
