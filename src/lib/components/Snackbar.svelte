<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import Portal from '$lib/components/Portal.svelte';
  import Cancel from '$lib/components/Icon/Cancel.svelte';
  import SnackbarMessage from '$lib/components/SnackbarMessage.svelte';
  import { snackBar } from '$lib/stores/snackBarStore';
</script>

<Portal>
  <div class="fixed left-1/2 top-5 z-snackBar -translate-x-1/2">
    {#each $snackBar as content (content.id)}
      <div in:fly={{ opacity: 0, y: 100 }} out:fade={{ duration: 300 }} animate:flip>
        <div
          class="mb-2 inline-block rounded-lg px-5 py-3 text-lg font-bold"
          class:info={content.type === 'info'}
          class:success={content.type === 'success'}
          class:warning={content.type === 'warning'}
          class:error={content.type === 'error'}
        >
          <div class="flex gap-4">
            <SnackbarMessage>{content.message}</SnackbarMessage>
            <button on:click={() => snackBar.remove(content.id)}>
              <Cancel />
            </button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</Portal>

<style lang="postcss">
  .success {
    @apply bg-robinEggBlue text-daisyBush;
  }

  .info {
    @apply bg-prim text-daisyBush;
  }

  .warning {
    @apply bg-goldenFizz text-scarlet;
  }

  .error {
    @apply bg-scarlet text-goldenFizz;
  }
</style>
