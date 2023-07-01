<script>
  import Search from '$lib/components/Icon/Search.svelte';
</script>

<div class="relative flex w-full items-center">
  <div class="mr-2 text-pastelPurple"><Search /></div>
  <input
    type="search"
    name="search"
    placeholder="Search by keyword"
    class="w-72 border-b-2 border-dashed border-b-pastelPurple bg-transparent font-sansSerif text-xl text-black outline-none focus-visible:border-solid focus-visible:border-b-lavenderIndigo"
  />
  <button class="font-sansSerif text-xl font-black text-pastelPurple">Search</button>
</div>
