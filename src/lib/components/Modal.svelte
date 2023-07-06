<script>
  import Portal from '$lib/components/Portal.svelte';
  import Overlay from '$lib/components/Overlay.svelte';
  import Cancel from '$lib/components/Icon/Cancel.svelte';
  import { createEventDispatcher } from 'svelte';

  export let isVisible = false;
  const dispatch = createEventDispatcher();
</script>

<svelte:head>
  <style lang="postcss">
    body {
      @apply overflow-hidden;
    }
  </style>
</svelte:head>

<svelte:window
  on:keydown={(evt) => {
    if (evt.key === 'Escape') {
      dispatch('close');
    }
  }}
/>

{#if isVisible}
  <Portal>
    <Overlay onClick={() => dispatch('close')} />
    <div class="center pointer-events-none fixed inset-0 z-modal">
      <div class="modal">
        <button
          on:click={() => dispatch('close')}
          class="absolute right-4 top-4 text-pastelPurple hover:text-daisyBush"
        >
          <Cancel />
        </button>
        <slot />
      </div>
    </div>
  </Portal>
{/if}

<style lang="postcss">
  .modal {
    @apply pointer-events-auto
    relative
    min-h-[230px]
    w-full
    max-w-[450px]
    rounded-lg
    bg-white
    px-10
    py-7;
  }
</style>
