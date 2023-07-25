<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import ClientRow from './ClientRow.svelte';
  import {clients, loadClients} from '$lib/stores/clientStore';
  import { onMount } from 'svelte';

  onMount(() => {
    loadClients();
  });
</script>

<svelte:head>
  <title>Clients | Pound Bill Craft</title>
</svelte:head>

<div class="search">
  <SearchInput />
  <div>
    <Button isAnimated={true} onClick={() => {}}>+ Client</Button>
  </div>
</div>

<div>
  {#if $clients === null}
    Loading...
    {:else if $clients.length === 0}
      Blanc state
    {:else }
  <ClientRowHeader />
    {#each $clients as client}
      <ClientRow {client} />
      {/each}
    {/if}
</div>

<style lang="postcss">
  .search {
    @apply mb-7
    flex
    flex-col-reverse
    justify-between
    gap-y-6
    md:flex-row
    md:items-center
    lg:mb-16
    lg:gap-y-4;
  }
</style>
