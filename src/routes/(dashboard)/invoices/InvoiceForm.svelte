<script lang="ts">
  import { createClient, clients, loadClients } from '$lib/stores/clientStore';
  import { slide } from 'svelte/transition';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import LineItemRows from './LineItemRows.svelte';
  import { counties } from '$lib/utils/counties';
  import { onMount } from 'svelte';
  import type { Client } from '../../../global';
  import { today } from '$lib/utils/date';
  import { addInvoice, updateInvoice } from '$lib/stores/invoiceStore';
  import ConfirmDelete from './ConfirmDelete.svelte';
  import type { ClientType, InvoiceType, LineItemType } from '../../../types/DTM';

  export let closePanel: () => void;

  const blankLineItem = { description: '', quantity: 10, amount: 0 };

  let isNewClient = false;
  let isDeleteModalShowing = false;

  export let invoice: InvoiceType = {
    client: {} as Client,
    lineItems: [{ ...blankLineItem}],
  } as unknown as InvoiceType;
  let newClient: Partial<ClientType> = {};

  export let formState: 'create' | 'edit' = 'create';
  const initialDiscount = invoice.discount || '0';

  const addLineItem = () => {
    invoice.lineItems = [...(invoice?.lineItems as LineItemType[]), { ...blankLineItem } as LineItemType];
  };

  const removeLineItem = (event: CustomEvent) => {
    if (invoice?.lineItems?.length === 1) {
      return;
    }
    invoice.lineItems = invoice?.lineItems?.filter((lineItem) => lineItem.id !== event.detail);
  };

  const updateLineItem = () => {
    invoice.lineItems = [...(invoice?.lineItems as [])];
  };

  const updateDiscount = (event: CustomEvent) => {
    invoice.discount = event.detail.discount;
  };

  const onClientChange = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    const selectedClient = $clients.find((client) => client.id === target.value);
    if (invoice.client) {
      invoice.client.name = selectedClient?.name || '';
      invoice.client.id = selectedClient?.id || '';
    }
  };

  const handleSubmitFunction = async () => {
    // add client if it is not empty object
    if (isNewClient && Object.keys(newClient).length !== 0) {
      invoice.client = newClient as ClientType;
      const addedClient = await createClient(newClient as ClientType);
      console.log(addedClient);
      if (addedClient?.id) {
        invoice.client.id = addedClient.id;
      }
    }
    if (formState === 'edit') {
      await updateInvoice(invoice);
    } else {
      await addInvoice(invoice);
    }
    invoice = {};
    closePanel();
  };

  const handleAddNewClient = () => {
    isNewClient = true;
    newClient = {} as Client;
  };

  const handleAddExistingClient = () => {
    isNewClient = false;
    invoice.client = {} as ClientType;
  };

  onMount(() => {
    loadClients();
  });
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">
  {#if formState === 'edit'}
    Edit an invoice
  {:else}
    Add an invoice
  {/if}
</h2>
<form class="grid grid-cols-6 gap-x-5" on:submit|preventDefault={handleSubmitFunction}>
  <div class="field col-span-6 md:col-span-4">
    {#if !isNewClient}
      <label for="client">Client</label>
      <div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap sm:gap-x-5">
        <select
          class="select mb-2 sm:mb-0"
          name="client"
          id="client"
          required={!isNewClient}
          on:change={onClientChange}
        >
          <option value="">Select a client</option>
          {#each $clients as client}
            <option selected={invoice.client?.name === client.name} value={client.id}>{client.name}</option>
          {/each}
        </select>
        <div class="text-base font-bold leading-[2.5rem] text-monsoon lg:leading-[3.5rem]">or</div>
        <Button variant="outline" onClick={handleAddNewClient}>+ Client</Button>
      </div>
    {:else}
      <label for="newClient">New Client</label>
      <div class="flex flex-wrap items-end gap-x-2 sm:flex-nowrap sm:gap-x-5">
        <input
          class="input mb-2 sm:mb-0"
          type="text"
          name="newClient"
          id="newClient"
          required={isNewClient}
          bind:value={newClient.name}
        />
        <div class="text-base font-bold leading-[2.5rem] text-monsoon lg:leading-[3.5rem]">or</div>
        <Button variant="outline" onClick={handleAddExistingClient}>Existing Client</Button>
      </div>
    {/if}
  </div>

  <div class="field col-span-6 row-start-1 md:col-span-2 md:row-start-auto">
    <label for="invoiceNumber">Invoice ID</label>
    <input
      class="input"
      type="text"
      name="invoiceNumber"
      id="invoiceNumber"
      required
      bind:value={invoice.invoiceNumber}
    />
  </div>

  <!--  New client info-->
  {#if isNewClient}
    <div class="field col-span-6 grid gap-x-5" transition:slide>
      <div class="field col-span-6">
        <label for="email">Client's email</label>
        <input
          class="input"
          type="text"
          name="email"
          id="email"
          required={isNewClient}
          bind:value={newClient.email}
        />
      </div>

      <div class="field col-span-6">
        <label for="street">Street</label>
        <input
          class="input"
          autocomplete="address-line1"
          type="text"
          name="street"
          id="street"
          bind:value={newClient.street}
        />
      </div>

      <div class="field col-span-2">
        <label for="city">City</label>
        <input
          class="input"
          autocomplete="address-level2"
          type="text"
          name="city"
          id="city"
          bind:value={newClient.city}
        />
      </div>

      <div class="field col-span-2">
        <label for="county">County</label>
        <select class="select" name="county" id="county" bind:value={newClient.county}>
          <option value="">Select a county</option>
          {#each counties as county}
            <option value={county.value}>{county.label}</option>
          {/each}
        </select>
      </div>

      <div class="field col-span-2">
        <label for="postcode">Postcode</label>
        <input
          class="input"
          autocomplete="postal-code"
          type="text"
          name="postcode"
          id="postcode"
          bind:value={newClient.postCode}
        />
      </div>
    </div>
  {/if}

  <div class="field col-span-3 sm:col-span-2">
    <label for="dueDate">Due date</label>
    <input
      class="input"
      type="date"
      name="dueDate"
      id="dueDate"
      min={today}
      required
      bind:value={invoice.dueDate}
    />
  </div>

  <div class="field col-span-3 sm:col-span-2 md:col-start-5">
    <label for="issueDate">Issue date</label>
    <input
      class="input"
      type="date"
      name="issueDate"
      id="issueDate"
      min={today}
      bind:value={invoice.issueDate}
    />
  </div>

  <div class="field col-span-6">
    <label for="subject">Subject</label>
    <input class="input" type="text" name="subject" id="subject" bind:value={invoice.subject} />
  </div>

  <div class="field col-span-6">
    <LineItemRows
      on:addLineItem={addLineItem}
      on:removeLineItem={removeLineItem}
      on:updateLineItem={updateLineItem}
      on:updateDiscount={updateDiscount}
      lineItems={invoice.lineItems}
      discount={invoice.discount || 0}
    />
  </div>

  <div class="field col-span-6">
    <label for="notes"
      >Notes
      <span class="font-normal">(optional, displayed on invoice)</span>
    </label>
    <textarea class="textarea" name="notes" id="notes" bind:value={invoice.notes} />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <div class="field col-span-6">
    <label for="terms"
      >Terms
      <span class="font-normal">(optional, enter your terms and conditions)</span>
    </label>
    <textarea class="textarea" name="terms" id="terms" bind:value={invoice.terms} />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <div class="field col-span-2">
    {#if formState === 'edit'}
      <Button
        onClick={() => (isDeleteModalShowing = true)}
        color="error"
        variant="text"
        iconLeft={Trash}
      >
        Delete
      </Button>
    {/if}
  </div>

  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button onClick={closePanel} variant="secondary">Cancel</Button>
    <Button type="submit">Save</Button>
  </div>
</form>

{#if formState === 'edit'}
  <ConfirmDelete
    amount=""
    {invoice}
    isModalShowing={isDeleteModalShowing}
    on:close={() => {
      isDeleteModalShowing = false;
      closePanel();
    }}
  />
{/if}
