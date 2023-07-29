<script lang="ts">
import { counties } from '$lib/utils/counties.js';
import Button from '$lib/components/Button.svelte';
import Trash from '$lib/components/Icon/Trash.svelte';
import Check from '$lib/components/Icon/Check.svelte';
import type { ClientType } from '../../../types/DTM';
import { createClient, updateClient } from '$lib/stores/clientStore';
import ConfirmDeleteClient from './ConfirmDeleteClient.svelte';

  export let client: ClientType = {} as ClientType;
  let clientCountyCode = counties.find((county) => county.label === client.county)?.value || '';
  let isDeleteClientModalOpen = false;

  export let closeAddClientPanel: () => void;
  export let formStatus: 'edit' | 'create' = 'create';

  const handleSubmit = async () => {
    if (formStatus === 'edit') {
      await updateClient(client);
    } else {
      const countyName = counties.find((county) => county.value === clientCountyCode)?.label || '';
      const newClient = {
        userId: '7c6166b5-6d09-4545-b8fb-8c606c98a6ea',
        city: client.city,
        county: countyName,
        email: client.email,
        name: client.name,
        street: client.street,
        postCode: client.postCode,
      };
      await createClient(newClient as ClientType);
    }
    closeAddClientPanel();
  };

</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {#if formStatus === 'edit'}
    Edit Client
  {:else}
    Add a Client
  {/if}
</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <div class="field col-span-6">
    <label for="name">Client Name</label>
    <input
      type="text"
      name="name"
      id="name"
      class="input"
      required
      bind:value={client.name}
    >
  </div>

  <div class="field col-span-6">
    <label for="email">Email</label>
    <input
      type="email"
      name="email"
      id="email"
      class="input"
      required
      bind:value={client.email}>
  </div>

  <div class="field col-span-6">
    <label for="street">Address</label>
    <input
      type="text"
      name="street"
      id="street"
      class="input"
      required
      bind:value={client.street}
    >
  </div>

<div class="field col-span-2">
  <label for="county">County</label>
  <select class="select" name="county" id="county" bind:value={clientCountyCode}>
    <option value="">Select a county</option>
    {#each counties as county}
      <option value={county.value}>{county.label}</option>
    {/each}
  </select>
</div>

  <div class="field col-span-2">
    <label for="city">City</label>
    <input
      type="text"
      name="city"
      id="city"
      class="input"
      required
      bind:value={client.city}
    >
  </div>

  <div class="field col-span-2">
    <label for="postCode">Post code</label>
    <input
      type="text"
      name="postCode"
      id="postCode"
      class="input"
      minlength="5"
      bind:value={client.postCode}
    >
  </div>

  {#if formStatus === 'edit'}
  <div class="field col-span-3">
    <Button
      className="!px-0"
      iconLeft={Trash}
      onClick={() => isDeleteClientModalOpen = true}
      variant="text"
      color="error"
    >
      Delete
    </Button>
  </div>
    {/if}

  <div class="field col-span-3 flex justify-end gap-x-5">
    <Button onClick={closeAddClientPanel} type="button" variant="secondary">
      Cancel
    </Button>
    <Button isAnimated iconRight={Check} type="submit">Save</Button>
  </div>
</form>

<ConfirmDeleteClient
  client={client}
  isModalShowing={isDeleteClientModalOpen}
  on:close={() => isDeleteClientModalOpen = false}
/>
