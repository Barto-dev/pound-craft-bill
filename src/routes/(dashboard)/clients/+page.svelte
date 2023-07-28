<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import SearchInput from '$lib/components/SearchInput.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
  import ClientRow from './ClientRow.svelte';
  import {clients, loadClients} from '$lib/stores/clientStore';
  import { onMount } from 'svelte';
  import SlidePanel from '$lib/components/SlidePanel.svelte';
  import ClientForm from './ClientForm.svelte';
  import type { ClientType } from '../../../types/DTM';
  import BlankState from './BlankState.svelte';

  const emptyClient = {} as ClientType;

  let isAddClientFormOpen = false;
  let isEditingCurrentClient = false;

  const closeAddClientPanel = () => {
    isAddClientFormOpen = false;
  }

  const openAddClientPanel = () => {
    isAddClientFormOpen = true;
  }

  onMount(() => {
    loadClients();
  });
</script>

<svelte:head>
  <title>Clients | Pound Bill Craft</title>
</svelte:head>

<div class="search">
  {#if $clients.length > 0}
    <SearchInput />
  {:else }
    <div />
  {/if}
  <div>
    <Button isAnimated={true} onClick={openAddClientPanel}>+ Client</Button>
  </div>
</div>

<div>
  {#if $clients === null}
    Loading...
    {:else if $clients.length === 0}
      <BlankState />
    {:else }
  <ClientRowHeader />
    {#each $clients as client}
      <ClientRow {client} />
      {/each}
    {/if}
</div>

{#if isAddClientFormOpen}
  <SlidePanel on:closePanel={closeAddClientPanel}>
    <ClientForm
      formStatus={isEditingCurrentClient ? 'edit' : 'create'}
      {closeAddClientPanel}
      client={emptyClient}
    />
  </SlidePanel>
{/if}

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
