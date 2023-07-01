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
    <h3>Amount</h3>
    <div />
    <div />
  </header>

  <div
    class="invoice-item invoice-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
  >
    <div class="status"><Tag className="ml-auto lg:ml-0" label="draft" /></div>
    <div class="due-date text-sm lg:text-lg">30/06/2023</div>
    <div class="invoice-number text-sm lg:text-lg">12345</div>
    <div class="client-name text-base font-bold lg:text-xl">Compressed.fm</div>
    <div class="amount text-right font-mono text-sm font-bold lg:text-lg">£504.00</div>
    <div class="lg:center view-button hidden lg:block">
      <a class="text-pastelPurple transition-all hover:text-daisyBush" href="/invoices/1"
        ><View />
      </a>
    </div>
    <div class="lg:center more-button hidden lg:block">
      <button class="text-pastelPurple transition-all hover:text-daisyBush"><ThreeDots /></button>
    </div>
  </div>
</div>

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

  .invoice-row {
    grid-template-areas:
      'invoiceNumber invoiceNumber'
      'clientName amount'
      'dueDate status';
  }

  @media (min-width: 1024px) {
    .invoice-row {
      grid-template-areas: 'status dueDate invoiceNumber clientName amount viewButton moreButton';
    }
  }

  .status {
    grid-area: status;
  }

  .due-date {
    grid-area: dueDate;
  }

  .invoice-number {
    grid-area: invoiceNumber;
  }

  .client-name {
    grid-area: clientName;
  }

  .amount {
    grid-area: amount;
  }

  .view-button {
    grid-area: viewButton;
  }

  .more-button {
    grid-area: moreButton;
  }
</style>
