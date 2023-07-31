<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';
  import Snackbar from '$lib/components/Snackbar.svelte';
  import Authenticated from '$lib/components/Authenticated.svelte';
</script>

<Authenticated>
  <Snackbar />
  <div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-12">
    <Navbar />
    <main class="col-span-12 px-4 pt-4 md:col-span-8 md:pt-10">
      <slot />
    </main>
  </div>
</Authenticated>
