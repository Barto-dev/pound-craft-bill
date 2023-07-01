<script lang="ts">
  import SearchInput from '$lib/components/SearchInput.svelte';
  import Tag from '$lib/components/Tag.svelte';
  import View from '$lib/components/Icon/View.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
</script>

<svelte:head>
  <title>Invoices | Pound Bill Craft</title>
</svelte:head>

<div class="mb-16 flex items-center justify-between">
  <SearchInput />
  <!--  new invoice button-->
  <div>
    <button class="btn">+ Invoice</button>
  </div>
</div>

<!--List of invoices-->
<div>
  <header class="table-header invoice-table text-daisyBush">
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3>Amount</h3>
    <div />
    <div />
  </header>

  <div class="invoice-table items-center rounded-lg bg-white py-6 shadow-tableRow">
    <div><Tag label="draft" /></div>
    <div class="text-lg">30/06/2023</div>
    <div class="text-lg">12345</div>
    <div class="text-xl font-bold">Compressed.fm</div>
    <div class="font-mono text-lg font-bold">£504.00</div>
    <div class="center">
      <a class="text-pastelPurple transition-all hover:text-daisyBush" href="/invoices/1"
        ><View /></a
      >
    </div>
    <div class="center">
      <button class="text-pastelPurple transition-all hover:text-daisyBush"
        ><ThreeDots /></button
      >
    </div>
  </div>
</div>

<CircledAmount label="Total:" amount="£10,251.00"/>

<style lang="postcss">
  .btn {
    @apply relative
    translate-y-0
    whitespace-nowrap
    rounded-lg
    bg-lavenderIndigo
    px-10
    py-3
    font-sansSerif
    text-xl
    font-black
    text-white
    shadow-colored
    transition-all
    hover:-translate-y-0.5
    hover:shadow-coloredHover;
  }

  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>
