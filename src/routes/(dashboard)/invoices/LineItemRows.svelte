<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ILineItem } from '../../../global';
  import LineItem from './LineItem.svelte';
  import Button from '$lib/components/Button.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';
  import { sumLineItems } from '$lib/utils/money';
  import { convertToNumericCurrency, formatToPoundCurrency } from '$lib/utils/money.js';

  export let lineItems: ILineItem[] | undefined = undefined;
  export let isEditable = true;
  let dispatch = createEventDispatcher();
  let subtotal = formatToPoundCurrency(0);
  export let discount = '0';
  let discountedAmount = '0';
  let total = 0;

  $: if (sumLineItems(lineItems) > 0) {
    subtotal = formatToPoundCurrency(sumLineItems(lineItems));
  }
  $: if (subtotal && discount) {
    discountedAmount = formatToPoundCurrency((Number(discount) / 100) * sumLineItems(lineItems));
  }

  $: total = convertToNumericCurrency(subtotal) - convertToNumericCurrency(discountedAmount);

  const onDiscountChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    if (convertToNumericCurrency(target.value) > 100) {
      discount = '100';
    } else {
      discount = target.value;
    }
  };
</script>

<section class="invoice-line-item border-b-2 border-daisyBush pb-2">
  <div class="table-header">Description</div>
  <div class="table-header text-right">Unit price</div>
  <div class="table-header text-center">Qty</div>
  <div class="table-header text-right">Amount</div>
</section>

{#if lineItems}
  {#each lineItems as lineItem, index}
    <LineItem
      {isEditable}
      {lineItem}
      on:removeLineItem
      canDelete={lineItems.length > 1}
      isRequired={index === 0}
      on:updateLineItem
    />
  {/each}
{/if}

<div class="invoice-line-item">
  <div class="col-span-1 sm:col-span-2">
    {#if isEditable}
      <Button variant="text" onClick={() => dispatch('addLineItem')}>+ Line item</Button>
    {/if}
  </div>
  <div class="py-3 text-right font-bold text-monsoon sm:py-5">Subtotal</div>
  <div class="py-3 text-right font-mono sm:py-5">{subtotal}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-1 py-3 text-right font-bold text-monsoon sm:col-span-2 sm:py-5">
    Discount
  </div>

  <div class="relative">
    <input
      disabled={!isEditable}
      type="text"
      inputmode="numeric"
      min="0"
      max="100"
      name="discount"
      class="block h-10 w-full appearance-none border-b-2 border-dashed border-stone-300 bg-transparent pr-4 text-right font-mono font-normal focus:border-solid focus:border-lavenderIndigo focus:outline-none"
      bind:value={discount}
      on:change={() => dispatch('updateDiscount', { discount })}
      on:input={onDiscountChange}
    />
    <span class="absolute right-0 top-2 font-mono">%</span>
  </div>
  <div class="pb-3 pt-2 text-right font-mono sm:pb-5">{discountedAmount}</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-3 sm:col-span-6">
    <CircledAmount label="Total:" amount={formatToPoundCurrency(total)} />
  </div>
</div>

<style lang="postcss">
  .table-header {
    @apply hidden text-sm font-bold text-daisyBush sm:block;
  }
</style>
