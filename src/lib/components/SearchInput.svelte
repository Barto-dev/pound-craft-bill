<script>
  import Search from '$lib/components/Icon/Search.svelte';
</script>

<div class="relative flex w-full items-center">
  <div class="mr-2 text-pastelPurple"><Search /></div>
  <input type="search" name="search" placeholder="Search by keyword" class="input" />
  <button class="font-sansSerif text-lg font-black text-pastelPurple lg:text-xl">Search</button>
</div>

<style lang="postcss">
  .input {
    @apply w-full
    border-b-2
    border-dashed
    border-b-pastelPurple
    bg-transparent
    font-sansSerif
    text-base
    text-black
    outline-none
    focus-visible:border-solid
    focus-visible:border-b-lavenderIndigo
    md:w-[14rem]
    lg:w-72
    lg:text-xl;
  }
</style>
