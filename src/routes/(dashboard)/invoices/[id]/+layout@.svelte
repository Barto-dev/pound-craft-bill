<script lang="ts">
  import ArrowLeft from '$lib/components/Icon/ArrowLeft.svelte';
  import { afterNavigate } from '$app/navigation';

  let previousPage: string | undefined = undefined;
  afterNavigate((navigation) => {
    previousPage = navigation.from?.url?.pathname;
  })
</script>

<div class="bg-whisper h-full min-h-screen pt-12 pb-32">
  <main class="mx-auto min-h-screen max-w-screen-lg">
    <a href={previousPage ? previousPage : '/invoices '} class="fixed top-7 left-7 text-pastelPurple"><ArrowLeft /></a>
    <slot />
  </main>
</div>
