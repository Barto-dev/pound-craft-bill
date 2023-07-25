<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import type { Invoice } from '../../../../global';
  import { convertDate } from '$lib/utils/date.js';
  import LineItemRows from '../LineItemRows.svelte';
  import { onMount } from 'svelte';
  import { loadSettings, settings } from '$lib/stores/settingsStore';
  import SvelteMarkdown from 'svelte-markdown';
  import { page } from '$app/stores';

  export let data: { invoice: Invoice };
  let copyLinkLabel = 'Copy link';
  const invoice = data.invoice;

  const printInvoice = () => {
    window.print();
  };

  const copyLink = () => {
    navigator.clipboard.writeText($page.url.href);
    copyLinkLabel = 'Copied!';

    setTimeout(() => {
      copyLinkLabel = 'Copy link';
    }, 2000);
  };

  const payInvoice = () => {
    console.log('pay invoice');
  };

  const sendInvoice = () => {
    console.log('send invoice');
  };

  onMount(() => {
    loadSettings();
  });
</script>

<header
  class="sticky top-6 z-0 -mt-6 mb-16 flex w-full max-w-screen-lg justify-between pl-32 pr-10 print:hidden"
>
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-4">
    <Button size="small" variant="outline" onClick={printInvoice}>Print</Button>
    <Button size="small" onClick={copyLink} className="min-w-[120px] justify-center">{copyLinkLabel}</Button>
    <Button size="small" onClick={sendInvoice}>Send</Button>
    <Button size="small" onClick={payInvoice}>Pay Invoice</Button>
  </div>
</header>

<div class="relative z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white px-32 py-16 shadow-invoice">
  <div class="col-span-3">
    <img src="/images/google-bard.svg" alt="Google Bard logo" />
  </div>

  <div class="col-span-2 col-start-5 pt-4">
    {#if $settings && $settings.myName}
      <p class="label">From</p>
      <p>
        {$settings.myName}<br />
        {$settings.street}<br />
        {#if $settings.city && $settings.county && $settings.zip}
          {$settings.city}, {$settings.county} {$settings.zip}
        {/if}
      </p>
    {:else}
      <div class="center min-h-[68px] rounded bg-gallery">
        <a href="#" class="text-stone-600 underline hover:no-underline">Add your contact information</a>
      </div>
    {/if}
  </div>

  <div class="col-span-3">
    <p class="label">Bill To:</p>
    <p>
      <strong>{invoice.client.name}</strong> <br />
      {invoice.client.email}<br />
      {invoice.client.street}<br />
      {invoice.client.city}
      {invoice.client.state}
      {invoice.client.zip}
    </p>
  </div>

  <div class="col-span-2 col-start-5">
    <p class="label">Invoice ID</p>
    <p>{invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-3">
    <p class="label">Due Date</p>
    <p>{convertDate(invoice.dueDate)}</p>
  </div>

  <div class="col-span-2 col-start-5">
    <p class="label">Issue Date</p>
    <p>{convertDate(invoice.issueDate)}</p>
  </div>

  <div class="col-span-6">
    <p class="label">Subject</p>
    <p>{invoice.subject}</p>
  </div>

  <div class="col-span-6">
    <LineItemRows lineItems={invoice.lineItems} isEditable={false} discount={invoice?.discount} />
  </div>

  {#if invoice.notes}
    <div class="col-span-6">
      <p class="label">Notes</p>
      <SvelteMarkdown source={invoice.notes} />
    </div>
  {/if}

  {#if invoice.terms}
    <div class="col-span-6">
      <p class="label">Terms</p>
      <SvelteMarkdown source={invoice.terms} />
    </div>
  {/if}
</div>

<style lang="postcss">
  .label {
    @apply m-0 font-black text-monsoon;
  }
</style>
