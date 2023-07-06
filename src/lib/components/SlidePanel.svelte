<script>
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
  <Overlay />
  <div class="bg-white fixed w-3/4 h-screen p-20 px-32 right-0 top-0 z-slidePanel shadow-slidePanel">
    <button on:click={() => dispatch('closePanel')} class="absolute left-5 top-7 text-pastelPurple hover:text-daisyBush">
      <ArrowLeft />
    </button>
    <slot />
  </div>
</Portal>
