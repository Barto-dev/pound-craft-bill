<script lang="ts">
  import ArrowLeft from '$lib/components/Icon/ArrowLeft.svelte';
  import { afterNavigate } from '$app/navigation';

  let previousPage: string | undefined = undefined;
  afterNavigate((navigation) => {
    previousPage = navigation.from?.url?.pathname;
  });
</script>

<div class="h-full min-h-screen bg-whisper print:bg-transparent pb-32 pt-20 lg:pt-12 print:pt-0 print:pb-0">
  <main class="mx-auto min-h-screen max-w-screen-lg">
    <a
      href={previousPage ? previousPage : '/invoices '}
      class="fixed left-7 top-7 text-pastelPurple print:hidden"><ArrowLeft /></a
    >
    <slot />
  </main>
</div>
