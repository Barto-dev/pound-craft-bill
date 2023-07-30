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
  <button
    type="submit"
    class="search-button">
    Search
  </button>
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
    pr-[70px]
    md:pr-0
    outline-none
    focus-visible:border-solid
    focus-visible:border-b-lavenderIndigo
    md:w-[14rem]
    lg:w-72
    lg:text-xl;
  }

  .search-input::placeholder {
    @apply text-transparent;
  }

  .search-button {
    @apply
      absolute
      pointer-events-none
      left-8
      font-sansSerif
      text-lg
      font-black
      text-pastelPurple
      lg:text-xl;
  }

  .search-input:not(:placeholder-shown) + .search-button,
  .search-input:focus + .search-button {
    @apply
      translate-x-[calc(100%-65px)]
      pointer-events-auto
      md:translate-x-[16rem]
      lg:translate-x-80
      left-auto
      text-right
      right-0
      md:right-auto
      md:left-0
      text-lavenderIndigo
    ;
  }

  .search-input + .search-button:hover,
  .search-input:focus + .search-button:focus {
    @apply text-daisyBush outline-none;
  }
</style>
