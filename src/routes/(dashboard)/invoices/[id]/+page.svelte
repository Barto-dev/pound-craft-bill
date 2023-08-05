<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { convertDate } from '$lib/utils/date.js';
  import LineItemRows from '../LineItemRows.svelte';
  import { onMount } from 'svelte';
  import { loadSettings, settings } from '$lib/stores/settingsStore';
  import SvelteMarkdown from 'svelte-markdown';
  import { page } from '$app/stores';
  import type { InvoiceType } from '../../../../types/DTM';
  import { getInvoiceById } from '$lib/stores/invoiceStore';

  let copyLinkLabel = 'Copy link';
  let invoice = {} as InvoiceType;

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

  onMount(async () => {
    await loadSettings();
    const invoiceId = $page.params.id;
    invoice = await getInvoiceById(invoiceId);
  });
</script>

<header
  class="sticky gap-y-5 top-16 lg:top-6 z-0 -mt-6 mb-16 flex flex-col md:flex-row w-full max-w-screen-lg justify-between pl-8 lg:pl-32 pr-10 print:hidden"
>
  <h1 class="text-3xl font-bold text-daisyBush">Invoice</h1>
  <div class="flex items-center gap-4 flex-wrap sm:flex-nowrap">
    <Button size="small" variant="outline" onClick={printInvoice}>Print</Button>
    <Button size="small" onClick={copyLink} className="min-w-[120px] justify-center">{copyLinkLabel}</Button>
    <Button size="small" onClick={sendInvoice}>Send</Button>
    <Button size="small" onClick={payInvoice}>Pay Invoice</Button>
  </div>
</header>

<div class="relative z-10 grid grid-cols-6 gap-x-5 gap-y-8 bg-white px-5 md:px-32 py-8 md:py-16 shadow-invoice print:py-0 print:shadow-none">
  <div class="sm:col-span-3 col-span-6 print:col-span-3">
    <img src="/images/google-bard.svg" alt="Google Bard logo" />
  </div>

  <div class="sm:col-span-2 sm:col-start-5 pt-4 col-span-6 print:col-span-3">
    {#if $settings && $settings.name}
      <p class="label">From</p>
      <p>
        {$settings.name}<br />
        {#if $settings.street}
          {$settings.street}<br />
        {/if}
        {#if $settings.city && $settings.county && $settings.postCode}
          {$settings.city}, {$settings.county} {$settings.postCode}
        {/if}
      </p>
    {:else}
      <div class="center min-h-[68px] rounded bg-gallery">
        <a href="/settings" class="text-stone-600 underline hover:no-underline">Add your contact information</a>
      </div>
    {/if}
  </div>

  <div class="sm:col-span-3 col-span-6 print:col-span-3">
    <p class="label">Bill To:</p>
    <p>
      {#if invoice?.client?.name}
        <strong>{invoice.client?.name}</strong> <br />
      {/if}
      {#if invoice?.client?.email}
        {invoice.client.email}<br />
      {/if}

      {#if invoice?.client?.street}
        {invoice.client.street}<br />
      {/if}

      {#if invoice?.client?.city}
        {invoice.client.city}<br />
      {/if}

      {#if invoice?.client?.county}
        {invoice.client.county}<br />
      {/if}

      {#if invoice?.client?.postCode}
        {invoice.client.postCode}<br />
      {/if}
    </p>
  </div>

  <div class="col-span-6 sm:col-span-2 sm:col-start-5">
    <p class="label">Invoice ID</p>
    <p>{invoice.invoiceNumber}</p>
  </div>

  <div class="col-span-3">
    <p class="label">Due Date</p>
    <p>{convertDate(invoice.dueDate)}</p>
  </div>

  <div class="col-span-3 sm:col-span-2 sm:col-start-5">
    <p class="label">Issue Date</p>
    <p>{convertDate(invoice.issueDate)}</p>
  </div>

  <div class="col-span-6">
    <p class="label">Subject</p>
    <p>{invoice.subject}</p>
  </div>

  <div class="col-span-6">
    <LineItemRows
      lineItems={invoice.lineItems}
      isEditable={false}
      discount={invoice?.discount || 0}
    />
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
