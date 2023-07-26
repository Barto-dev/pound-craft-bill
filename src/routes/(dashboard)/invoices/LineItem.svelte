<script lang="ts">
  import Trash from '$lib/components/Icon/Trash.svelte';
  import { createEventDispatcher } from 'svelte';
  import {
    convertToNumericCurrency,
    formatToPoundCurrency,
    poundsToPennies
  } from '$lib/utils/money';
  import { penniesToPounds } from '$lib/utils/money.js';
  import type { LineItemType } from '../../../types/DTM';

  export let lineItem: LineItemType;
  export let isEditable = true;
  export let canDelete = false;
  export let isRequired = false;
  let unitPrice: string = formatToPoundCurrency(
    penniesToPounds(Number(lineItem.amount) / Number(lineItem.quantity))
  );
  let amount: string = formatToPoundCurrency(penniesToPounds(lineItem.amount));
  const dispatch = createEventDispatcher();

  // TODO update parse mechanism
  const handleUnitPriceChange = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    const unitPriceNumberRepresentation = convertToNumericCurrency(target.value);
    unitPrice = formatToPoundCurrency(unitPriceNumberRepresentation);
    dispatch('updateLineItem');
  };

  // something like useEffect in React
  $: {
    const amountInNumericCurrency = Number(lineItem.quantity) * convertToNumericCurrency(unitPrice);
    amount = formatToPoundCurrency(amountInNumericCurrency);
    lineItem.amount = poundsToPennies(amountInNumericCurrency);
  }
</script>

<div class="invoice-line-item border-b-2 border-fog py-4 sm:py-2">
  <div class="description">
    <label for="description" class="line-item-label text-right">Description</label>
    <input
      disabled={!isEditable}
      id="description"
      class="line-item-input text text-black"
      type="text"
      name="description"
      required={isRequired}
      bind:value={lineItem.description}
    />
  </div>
  <div class="unitPrice">
    <label for="unitPrice" class="line-item-label text-right">Unit Price</label>
    <input
      disabled={!isEditable}
      class="line-item-input number text-right"
      type="text"
      inputmode="decimal"
      name="unitPrice"
      step="0.01"
      min="0"
      id="unitPrice"
      required={isRequired}
      bind:value={unitPrice}
      on:input={handleUnitPriceChange}
    />
  </div>
  <div class="quantity">
    <label for="quantity" class="line-item-label text-center">Quantity</label>
    <input
      disabled={!isEditable}
      class="line-item-input number text-center"
      type="text"
      inputmode="numeric"
      name="quantity"
      min="0"
      id="quantity"
      required={isRequired}
      bind:value={lineItem.quantity}
      on:input={() => dispatch('updateLineItem')}
    />
  </div>
  <div class="amount">
    <label for="amount" class="line-item-label text-right">Amount</label>
    <input
      class="line-item-input number text-right"
      type="text"
      inputmode="numeric"
      name="amount"
      id="amount"
      step="0.01"
      bind:value={amount}
      disabled
    />
  </div>

  {#if canDelete && isEditable}
    <div class="trash">
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

  .line-item-label {
    @apply block sm:hidden;
  }
</style>
