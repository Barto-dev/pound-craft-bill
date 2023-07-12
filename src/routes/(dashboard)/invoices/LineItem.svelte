<script lang="ts">
  import Trash from '$lib/components/Icon/Trash.svelte';
</script>

<div class="invoice-line-item border-b-2 border-fog py-2">
  <div>
    <input class="line-item-input" type="text" name="description" />
  </div>
  <div>
    <input class="line-item-input text-right" type="number" name="unitPrice" step="0.01" min="0" />
  </div>
  <div>
    <input class="line-item-input text-center" type="number" name="quantity" min="0" />
  </div>
  <div>
    <input class="line-item-input text-right" type="number" name="amount" step="0.01" />
  </div>

  <div>
    <button class="center h-10 text-pastelPurple hover:text-lavenderIndigo">
      <Trash />
    </button>
  </div>
</div>

<style lang="postcss">
  .line-item-input {
    @apply h-10 w-full border-b-2 border-dashed border-stone-300;
  }

  .line-item-input:focus {
    @apply border-solid border-lavenderIndigo outline-none;
  }

  input[type='text'].line-item-input {
    @apply font-sansSerif text-xl font-bold;
  }

  input[type='number'].line-item-input {
    @apply font-mono text-base;
  }
</style>
