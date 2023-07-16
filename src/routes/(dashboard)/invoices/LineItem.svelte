<script lang="ts">
  import Trash from '$lib/components/Icon/Trash.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { ILineItem } from '../../../global';
  import {
    convertToNumericCurrency,
    formatToPoundCurrency,
    poundsToPennies
  } from '$lib/utils/money';

  export let lineItem: ILineItem;
  export let canDelete: boolean = false;
  let unitPrice: string = formatToPoundCurrency(lineItem.amount / lineItem.quantity);
  let amount: string = formatToPoundCurrency(lineItem.amount);

  // TODO update parse mechanism
  const handleUnitPriceChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    const unitPriceNumberRepresentation = convertToNumericCurrency(target.value);
    unitPrice = formatToPoundCurrency(unitPriceNumberRepresentation);
  };
  const dispatch = createEventDispatcher();

  // something like useEffect in React
  $: {
    const amountInNumericCurrency = lineItem.quantity * convertToNumericCurrency(unitPrice);
    amount = formatToPoundCurrency(amountInNumericCurrency);
    lineItem.amount = poundsToPennies(amountInNumericCurrency);
  }
</script>

<div class="invoice-line-item border-b-2 border-fog py-2">
  <div>
    <input
      class="line-item-input text text-black"
      type="text"
      name="description"
      bind:value={lineItem.description}
    />
  </div>
  <div>
    <input
      class="line-item-input number text-right"
      type="text"
      inputmode="decimal"
      name="unitPrice"
      step="0.01"
      min="0"
      bind:value={unitPrice}
      on:input={handleUnitPriceChange}
    />
  </div>
  <div>
    <input
      class="line-item-input number text-center"
      type="text"
      inputmode="numeric"
      name="quantity"
      min="0"
      bind:value={lineItem.quantity}
    />
  </div>
  <div>
    <input
      class="line-item-input number text-right"
      type="text"
      inputmode="numeric"
      name="amount"
      step="0.01"
      bind:value={amount}
      disabled
    />
  </div>

  {#if canDelete}
    <div>
      <button
        type="button"
        on:click={() => dispatch('removeLineItem', lineItem.id)}
        class="center h-10 text-pastelPurple hover:text-lavenderIndigo"
      >
        <Trash />
      </button>
    </div>
  {/if}
</div>

<style lang="postcss">
  .line-item-input {
    @apply h-10 w-full border-b-2 border-dashed border-stone-300;
  }

  .line-item-input:focus {
    @apply border-solid border-lavenderIndigo outline-none;
  }

  .line-item-input:disabled {
    @apply border-b-0 bg-transparent px-0;
  }

  .text.line-item-input {
    @apply font-sansSerif text-xl font-bold;
  }

  .number.line-item-input {
    @apply font-mono text-base font-normal;
  }
</style>
