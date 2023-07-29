<script lang="ts">
  import Search from '$lib/components/Icon/Search.svelte';
  import {createEventDispatcher} from 'svelte';
  import type { FormEventHandler } from 'svelte/elements';

  const dispatch = createEventDispatcher();
  let searchTerms = '';

  const handleSubmit = () => {
    dispatch('search', {searchTerms});
  }

  const handleClear = (evt: Event) => {
    const target = evt.target as HTMLInputElement;
    if (!target.value) {
      dispatch('clear', {searchTerms: ''});
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="relative flex w-full items-center">
  <div class="mr-2 text-pastelPurple"><Search /></div>
  <input
    type="search"
    name="search"
    placeholder="Search by keyword"
    class="search-input"
    on:input={handleClear}
    bind:value={searchTerms}
  />
  <button type="submit" class="font-sansSerif text-lg font-black text-pastelPurple lg:text-xl">Search</button>
</form>

<style lang="postcss">
  .search-input {
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
