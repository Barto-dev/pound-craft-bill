<script lang="ts">
  import Tag from '$lib/components/Tag.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import View from '$lib/components/Icon/View.svelte';
  import type { Invoice } from '../../../global';
  import { sumLineItems, formatToPoundCurrency } from '$lib/utils/money';
  import { convertDate, isLate } from '$lib/utils/date';
  import { invoices } from '$lib/stores/invoiceStore.js';
  import { getInvoiceLabel } from '$lib/utils/invoice';

  export let invoice: Invoice;

  const invoiceLabel = getInvoiceLabel(invoice.invoiceStatus, invoice.dueDate);

  const amount = sumLineItems(invoice.lineItems);
  const formattedAmount = formatToPoundCurrency(amount);

  const convertedDate = convertDate(invoice.dueDate);
</script>

<div class="invoice-item invoice-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
  <div class="status">
    <Tag className="ml-auto lg:ml-0" label={invoiceLabel} />
  </div>
  <div class="due-date text-sm lg:text-lg">{convertedDate}</div>
  <div class="invoice-number text-sm lg:text-lg">{invoice.invoiceNumber}</div>
  <div class="client-name truncate whitespace-nowrap text-base font-bold lg:text-xl">
    {invoice.client.name}
  </div>
  <div class="amount text-right font-mono text-sm font-bold lg:text-lg">{formattedAmount}</div>
  <div class="lg:center view-button hidden lg:block">
    <a class="text-pastelPurple transition-all hover:text-daisyBush" href="/invoices/1">
      <View />
    </a>
  </div>
  <div class="lg:center more-button hidden lg:block">
    <button class="text-pastelPurple transition-all hover:text-daisyBush">
      <ThreeDots />
    </button>
  </div>
</div>

<style lang="postcss">
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
