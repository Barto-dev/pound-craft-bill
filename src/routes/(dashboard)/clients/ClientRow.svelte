<script lang="ts">
  import Tag from '$lib/components/Tag.svelte';
  import View from '$lib/components/Icon/View.svelte';
  import ThreeDots from '$lib/components/Icon/ThreeDots.svelte';
  import AdditionalOptions from '$lib/components/AdditionalOptions/AdditionalOptions.svelte';
  import Edit from '$lib/components/Icon/Edit.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import Archive from '$lib/components/Icon/Archive.svelte';
  import Activate from '$lib/components/Icon/Activate.svelte';
  import type { ClientType } from '../../../types/DTM';

  export let isAdditionalOptionsOpen = false;
  export let client: ClientType;

  const options = [
    { label: 'Edit', icon: Edit, onClick: () => {}, disabled: false },
    { label: 'Delete', icon: Trash, onClick: () => {}, disabled: false },
    { label: 'Archive', icon: Archive, onClick: () => {}, disabled: client.clientStatus === 'archived' },
    { label: 'Activate', icon: Activate, onClick: () => {}, disabled: client.clientStatus === 'active' },
  ];

  const onOptionsClick = () => {
    isAdditionalOptionsOpen = !isAdditionalOptionsOpen;
  }
</script>

<div class="client-table rounded-lg bg-white py-3 shadow-tableRow lg:py-6">
  <div>
    <Tag className="mr-auto" label={client.clientStatus}/>
  </div>
  <div class="truncate whitespace-nowrap text-base lg:text-xl font-bold">{client.name}</div>
  <div class="text-center font-mono text-sm lg:text-lg font-bold">504</div>
  <div class="text-center font-mono text-sm lg:text-lg font-bold text-scarlet">240</div>
  <div class="relative hidden lg:center">

  <a href="/" class="text-pastelPurple hover:text-daisyBush">
    <View />
  </a>
  </div>
  <div class="relative hidden lg:center">
    <button on:click={onOptionsClick} class="text-pastelPurple hover:text-daisyBush">
      <ThreeDots />
    </button>
    {#if isAdditionalOptionsOpen}
    <AdditionalOptions {options} />
    {/if}
  </div>
</div>
