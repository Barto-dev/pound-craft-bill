<script>
  import { fly } from 'svelte/transition';
  import Portal from '$lib/components/Portal.svelte';
  import Overlay from '$lib/components/Overlay.svelte';
  import ArrowLeft from '$lib/components/Icon/ArrowLeft.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
</script>

<svelte:window
  on:keydown={(evt) => {
    if (evt.key === 'Escape') {
      dispatch('closePanel');
    }
  }}
/>

<Portal>
  <Overlay onClick={() => dispatch('closePanel')} />
  <div transition:fly={{x: 1000, duration: 300}} class="container">
    <button
      on:click={() => dispatch('closePanel')}
      class="absolute left-5 top-7 text-pastelPurple hover:text-daisyBush"
    >
      <ArrowLeft />
    </button>
    <slot />
  </div>
</Portal>

<style lang="postcss">
  .container {
    @apply fixed
    right-0
    top-0
    z-slidePanel
    h-screen
    w-full
    overflow-y-auto
    bg-white
      px-5
      py-16
    shadow-slidePanel
    lg:w-3/4
    lg:p-20
    lg:px-32;
  }
</style>
