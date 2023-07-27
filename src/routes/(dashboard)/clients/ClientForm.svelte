<script lang="ts">
import { counties } from '$lib/utils/counties.js';
import Button from '$lib/components/Button.svelte';
import Trash from '$lib/components/Icon/Trash.svelte';
import Check from '$lib/components/Icon/Check.svelte';
import type { ClientType } from '../../../types/DTM';

  export let client: ClientType | undefined;
  export let closeAddClientPanel: () => void;
  export let formStatus: 'edit' | 'create' = 'create';

  const handleSubmit = (event: Event) => {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add a Client</h2>

<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmit}>
  <div class="field col-span-6">
    <label for="name">Client Name</label>
    <input type="text" name="name" id="name" class="input" required value={client?.name}>
  </div>

  <div class="field col-span-6">
    <label for="email">Email</label>
    <input type="email" name="email" id="email" class="input" required value={client?.email}>
  </div>

  <div class="field col-span-6">
    <label for="street">Address</label>
    <input type="text" name="street" id="street" class="input" required value={client?.street}>
  </div>

<div class="field col-span-2">
    <label for="county">County</label>
  <select class="select" name="county" id="county">
    <option value="">Select a county</option>
    {#each counties as county}
      <option selected={county.value === client?.county} value={county.value}>{county.label}</option>
    {/each}
  </select>
</div>

  <div class="field col-span-2">
    <label for="city">City</label>
    <input type="text" name="city" id="city" class="input" required value={client?.city}>
  </div>

  <div class="field col-span-2">
    <label for="postCode">Post code</label>
    <input type="text" name="postCode" id="postCode" class="input" minlength="5" value={client?.postCode}>
  </div>

  <div class="field col-span-3">
    <Button className="!px-0" iconLeft={Trash} onClick={() => {}} variant="text" color="error">
      Delete
    </Button>
  </div>

  <div class="field col-span-3 flex justify-end gap-x-5">
    <Button onClick={closeAddClientPanel} type="submit" variant="secondary">
      Cancel
    </Button>
    <Button isAnimated iconRight={Check} type="submit">Save</Button>
  </div>
</form>
