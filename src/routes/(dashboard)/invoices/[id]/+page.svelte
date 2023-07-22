<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  const printInvoice = () => {
    window.print();
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  }

  const payInvoice = () => {
    console.log('pay invoice');
  }

  const sendInvoice = () => {
    console.log('send invoice');
  }
</script>

<header class="sticky top-6 z-0 mb-16 flex w-full max-w-screen-lg justify-between pl-32 -mt-6">
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-4">
    <Button size="small" variant="outline" onClick={printInvoice}>Print</Button>
    <Button size="small" onClick={copyLink}>Copy link</Button>
    <Button size="small" onClick={sendInvoice}>Send</Button>
    <Button size="small" onClick={payInvoice}>Pay Invoice</Button>
  </div>
</header>

<div class="relative z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white py-16 px-32 shadow-invoice">
  <div>
    <img src="/images/google-bard.svg" alt="Google Bard logo">
  </div>

  <div class="col-span-2 col-start-5 pt-4">
    <p class="label">From</p>
    <p>
      Illia Meln <br />
      123D Awesome Street <br />
      Hampshire S012 3AB
    </p>
  </div>

  <div class="col-span-3">
    <p class="label">Bill To:</p>
    <p>
      <strong>Company Binary</strong> <br />
      binary@mail.com <br />
      789 Templar avenue <br />
      London, LO3 2RT
    </p>
  </div>

  <div class="col-span-2 col-start-5">
    <p class="label">Invoice ID</p>
    <p>123456</p>
  </div>

  <div class="col-span-3">
    <p class="label">Due Date</p>
    <p>12/12/2021</p>
  </div>

  <div class="col-span-2 col-start-5">
    <p class="label">Issue Date</p>
    <p>12/12/2021</p>
  </div>

  <div class="col-span-6">
    <p class="label">Subject</p>
    <p>Website</p>
  </div>

  <div>Line items</div>

  <div class="col-span-6">
    <p class="label">Notes</p>
    <p>Lorem ipsum dolor.</p>
  </div>

  <div class="col-span-6">
    <p class="label">Terms</p>
    <p>Lorem ipsum dolor.</p>
  </div>
</div>

<style lang="postcss">

  .label {
    @apply font-black text-monsoon m-0;
  }
</style>
