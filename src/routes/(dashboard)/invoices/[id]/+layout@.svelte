<script lang="ts">
  import ArrowLeft from '$lib/components/Icon/ArrowLeft.svelte';
  import { afterNavigate } from '$app/navigation';

  let previousPage: string | undefined = undefined;
  afterNavigate((navigation) => {
    previousPage = navigation.from?.url?.pathname;
  });
</script>

<div class="h-full min-h-screen bg-whisper pb-32 pt-20 lg:pt-12">
  <main class="mx-auto min-h-screen max-w-screen-lg">
    <a
      href={previousPage ? previousPage : '/invoices '}
      class="fixed left-7 top-7 text-pastelPurple"><ArrowLeft /></a
    >
    <slot />
  </main>
</div>
