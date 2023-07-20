<script lang="ts">
  import { nanoid } from 'nanoid';
  import { clients, loadClients } from '$lib/stores/clientStore';
  import { slide } from 'svelte/transition';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import LineItemRows from './LineItemRows.svelte';
  import { counties } from '$lib/utils/counties';
  import { onMount } from 'svelte';
  import type { ILineItem } from '../../../global';
  import { today } from '$lib/utils/date';

  const blankLineItem = { description: '', quantity: 10, amount: 0 };

  export let lineItems: ILineItem[] = [{ ...blankLineItem, id: nanoid() }];
  let isNewClient = false;

  const addLineItem = () => {
    lineItems = [...lineItems, { ...blankLineItem, id: nanoid() }];
  };

  const removeLineItem = (event: CustomEvent<any>) => {
    if (lineItems.length === 1) {
      return;
    }
    lineItems = lineItems.filter((lineItem) => lineItem.id !== event.detail);
  };

  const updateLineItem = () => {
    lineItems = [...lineItems];
  };

  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an invoice</h2>
<form class="grid grid-cols-6 gap-x-5">
  <div class="field col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex items-end gap-x-5">
        <select class="select" name="client" id="client" required={!isNewClient}>
          <option value="">Select a client</option>
          {#each $clients as client}
            <option value={client.id}>{client.name}</option>
          {/each}
        </select>
        <div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
        <Button variant="outline" onClick={() => (isNewClient = true)}>+ Client</Button>
      </div>
    {:else}
      <label for="newClient">New Client</label>
      <div class="flex items-end gap-x-5">
        <input class="input" type="text" name="newClient" id="newClient" required={isNewClient} />
        <div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
        <Button variant="outline" onClick={() => (isNewClient = false)}>Existing Client</Button>
      </div>
    {/if}
  </div>

  <div class="field col-span-2">
    <label for="invoiceNumber">Invoice ID</label>
    <input class="input" type="text" name="invoiceNumber" id="invoiceNumber" required />
  </div>

  <!--  New client info-->
  {#if isNewClient}
    <div class="field col-span-6 grid gap-x-5" transition:slide>
      <div class="field col-span-6">
        <label for="email">Client's email</label>
        <input class="input" type="text" name="email" id="email" required={isNewClient} />
      </div>

      <div class="field col-span-6">
        <label for="street">Street</label>
        <input class="input" autocomplete="address-line1" type="text" name="street" id="street" />
      </div>

      <div class="field col-span-2">
        <label for="city">City</label>
        <input class="input" autocomplete="address-level2" type="text" name="city" id="city" />
      </div>

      <div class="field col-span-2">
        <label for="county">County</label>
        <select class="select" name="county" id="county">
          <option value="">Select a county</option>
          {#each counties as county}
            <option value={county.value}>{county.label}</option>
          {/each}
        </select>
      </div>

      <div class="field col-span-2">
        <label for="postcode">Postcode</label>
        <input class="input" autocomplete="postal-code" type="text" name="postcode" id="postcode" />
      </div>
    </div>
  {/if}

  <div class="field col-span-2">
    <label for="dueDate">Due date</label>
    <input
      class="input"
      type="date"
      name="dueDate"
      id="dueDate"
      min={today}
      required
    />
  </div>

  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Issue date</label>
    <input
      class="input"
      type="date"
      name="issueDate"
      id="issueDate"
      min={today}
    />
  </div>

  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input class="input" type="text" name="subject" id="subject" />
  </div>

  <div class="field col-span-6">
    <LineItemRows
      on:addLineItem={addLineItem}
      on:removeLineItem={removeLineItem}
      on:updateLineItem={updateLineItem}
      {lineItems}
    />
  </div>

  <div class="field col-span-6">
    <label for="notes"
      >Notes
      <span class="font-normal">(optional, displayed on invoice)</span>
    </label>
    <textarea class="textarea" name="notes" id="notes" />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <div class="field col-span-6">
    <label for="terms"
      >Terms
      <span class="font-normal">(optional, enter your terms and conditions)</span>
    </label>
    <textarea class="textarea" name="terms" id="terms" />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <div class="field col-span-2">
    <Button onClick={() => {}} color="error" variant="text" iconLeft={Trash}>Delete</Button>
  </div>

  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button onClick={() => {}} variant="secondary">Cancel</Button>
    <Button onClick={() => {}} type="submit">Save</Button>
  </div>
</form>
