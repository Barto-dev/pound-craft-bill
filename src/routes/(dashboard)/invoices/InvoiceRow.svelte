<script lang="ts">
  import {clickOutside} from '$lib/actions/clickOutside';
  import {swipe} from '$lib/actions/swipe';
  import Tag from '$lib/components/Tag.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import View from '$lib/components/Icon/View.svelte';
  import { formatToPoundCurrency } from '$lib/utils/money';
  import { convertDate } from '$lib/utils/date';
  import { getInvoiceLabel } from '$lib/utils/invoice';
  import AdditionalOptions from '$lib/components/AdditionalOptions/AdditionalOptions.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Send from '$lib/components/Icon/Send.svelte';
  import InvoiceForm from './InvoiceForm.svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ConfirmDelete from './ConfirmDelete.svelte';
  import { invoiceTotal } from '$lib/utils/money.js';
  import type { InvoiceType } from '../../../types/DTM';
  import Cancel from '$lib/components/Icon/Cancel.svelte';

  export let invoice: InvoiceType;
  let isAdditionalMenuShowing = false;

  const invoiceLabel = getInvoiceLabel(invoice.invoiceStatus, invoice.dueDate);

  const amount = invoiceTotal(invoice.lineItems, Number(invoice.discount));
  const formattedAmount = formatToPoundCurrency(amount);

  const convertedDate = convertDate(invoice.dueDate);

  const isEditDisabled =
    invoiceLabel === 'sent' || invoiceLabel === 'late' || invoiceLabel === 'paid';
  const isSendDisabled =
    invoiceLabel === 'sent' || invoiceLabel === 'late' || invoiceLabel === 'paid';

  let isModalShowing = false;
  let isInvoiceEditShowing = false;
  let triggerReset = false;
  const handleDelete = () => {
    isModalShowing = true;
    isAdditionalMenuShowing = false;
  };

  const handleEdit = () => {
    isInvoiceEditShowing = true;
    isAdditionalMenuShowing = false;
  };

  const handleSendInvoice = () => {
    console.log('Sending');
  };
  const options = [
    { label: 'Edit', icon: Edit, onClick: handleEdit, disabled: isEditDisabled },
    { label: 'Delete', icon: Trash, onClick: handleDelete, disabled: false },
    { label: 'Send', icon: Send, onClick: handleSendInvoice, disabled: isSendDisabled }
  ];
</script>

<div class="relative">
  <div
    use:swipe={{triggerReset}}
    on:outofview={() => (triggerReset = false)}
    class="z-row invoice-item relative invoice-row items-center rounded-lg bg-white py-3 shadow-tableRow lg:py-6"
  >
    <div class="status">
      <Tag className="ml-auto lg:ml-0" label={invoiceLabel} />
    </div>
    <div class="due-date text-sm lg:text-lg">{convertedDate}</div>
    <div class="invoice-number text-sm lg:text-lg">{invoice.invoiceNumber}</div>
    <div class="client-name truncate whitespace-nowrap text-base font-bold lg:text-xl">
      {invoice?.client?.name}
    </div>
    <div class="amount text-right font-mono text-sm font-bold lg:text-lg">{formattedAmount}</div>
    <div class="lg:center view-button hidden">
      <a
        href={`/invoices/${invoice.id}`}
        class="text-pastelPurple transition-all hover:text-daisyBush"
      >
        <View />
      </a>
    </div>
    <div class="lg:center more-button relative hidden lg:block"
         use:clickOutside={() => isAdditionalMenuShowing = false}>
      <button
        on:click={() => (isAdditionalMenuShowing = !isAdditionalMenuShowing)}
        class="text-pastelPurple transition-all hover:text-daisyBush"
      >
        <ThreeDots />
      </button>
      {#if isAdditionalMenuShowing}
        <AdditionalOptions {options} />
      {/if}
    </div>
  </div>

<!--  swipe to reveal-->
  <div class="swipe-revealed-actions">
    <button class="swipe-revealed-button" on:click={() => triggerReset = true}>
      <Cancel width={32} height={32} />
      Cancel
    </button>

    {#if isEditDisabled}
      <button class="swipe-revealed-button" on:click={handleEdit}>
        <Edit width={32} height={32} />
        Edit
      </button>
    {/if}

    {#if isSendDisabled}
      <button class="swipe-revealed-button" on:click={handleSendInvoice}>
        <Send width={32} height={32} />
        Send
      </button>
    {/if}

    <button class="swipe-revealed-button" on:click={handleDelete}>
      <Trash width={32} height={32} />
      Delete
    </button>

    <a href={`/invoices/${invoice.id}`} class="swipe-revealed-button">
      <View width={32} height={32} />
      View
    </a>
  </div>
</div>

{#if isInvoiceEditShowing}
  <SlidePanel on:closePanel={() => (isInvoiceEditShowing = false)}>
    <InvoiceForm {invoice} formState="edit" closePanel={() => (isInvoiceEditShowing = false)} />
  </SlidePanel>
{/if}

<ConfirmDelete
  amount={formattedAmount}
  {invoice}
  {isModalShowing}
  on:close={() => (isModalShowing = false)}
/>

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
