<script lang="ts">
  import Snackbar from '$lib/components/Snackbar.svelte';
  import Unauthenticated from '$lib/components/Unauthenticated.svelte';
</script>

<Unauthenticated>
  <Snackbar />
  <div class="min-h-screen w-full bg-daisyBush md:bg-auth bg-center">
    <div class="h-screen w-full grid grid-cols-12 md:gap-5 auto-rows-min md:auto-rows-fr px-4 xl:px-0">
      <div class="col-span-12 md:col-span-6 lg:col-span-4 lg:col-start-3 xl:col-span-3 xl:col-start-4 pt-8 md:my-auto relative">
        <div class="logo-text text-center">Pound Bill Craft</div>
        <img src="/images/logo.svg" alt="Pound Bill Craft" class="mx-auto">
      </div>
      <div class="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 md:my-auto">
        <slot />
      </div>
    </div>
  </div>
</Unauthenticated>
