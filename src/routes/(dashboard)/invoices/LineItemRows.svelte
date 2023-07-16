<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { ILineItem } from '../../../global';
  import LineItem from './LineItem.svelte';
  import Button from '$lib/components/Button.svelte';
  import CircledAmount from '$lib/components/CircledAmount.svelte';

  export let lineItems: ILineItem[] | undefined = undefined;
  let dispatch = createEventDispatcher();
</script>

<section class="invoice-line-item border-b-2 border-daisyBush pb-2">
  <div class="table-header">Description</div>
  <div class="table-header text-right">Unit price</div>
  <div class="table-header text-center">Qty</div>
  <div class="table-header text-right">Amount</div>
</section>

{#if lineItems}
  {#each lineItems as lineItem}
    <LineItem {lineItem} on:removeLineItem canDelete={lineItems.length > 1} />
  {/each}
{/if}

<div class="invoice-line-item">
  <div class="col-span-2">
    <Button variant="text" onClick={() => dispatch('addLineItem')}>+ Line item</Button>
  </div>
  <div class="py-5 text-right font-bold text-monsoon">Subtotal</div>
  <div class="py-5 text-right font-mono">250.00</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-2 py-5 text-right font-bold text-monsoon">Discount</div>

  <div class="relative">
    <input
      type="text"
      inputmode="numeric"
      min="0"
      max="100"
      name="discount"
      class="block h-10 w-full border-b-2 border-dashed border-stone-300 pr-4 text-right font-mono font-normal focus:border-solid focus:border-lavenderIndigo focus:outline-none"
    />
    <span class="absolute right-0 top-2 font-mono">%</span>
  </div>
  <div class="py-5 text-right font-mono">10.00</div>
</div>

<div class="invoice-line-item">
  <div class="col-span-6">
    <CircledAmount label="Total:" amount="200" />
  </div>
</div>

<style lang="postcss">
  .table-header {
    @apply text-sm font-bold text-daisyBush;
  }
</style>
