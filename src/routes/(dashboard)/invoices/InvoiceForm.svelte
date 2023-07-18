<script lang="ts">
  import { nanoid } from 'nanoid';
  import Button from '$lib/components/Button.svelte';
  import Trash from '$lib/components/Icon/Trash.svelte';
  import LineItemRows from './LineItemRows.svelte';
  import LineItem from './LineItem.svelte';

  const blankLineItem = { description: '', quantity: 10, amount: 0 };

  export let lineItems: LineItem[] = [{ ...blankLineItem, id: nanoid() }];

  const addLineItem = () => {
    lineItems = [...lineItems, { ...blankLineItem, id: nanoid() }];
  };

  const removeLineItem = (event) => {
    if (lineItems.length === 1) {
      return;
    }
    lineItems = lineItems.filter((lineItem) => lineItem.id !== event.detail);
  };

  const updateLineItem = () => {
    lineItems = [...lineItems];
  }
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an invoice</h2>
<form class="grid grid-cols-6 gap-x-5">
  <div class="field col-span-2">
    <label for="client">Client</label>
    <select class="select" name="client" id="client">
      <option value="1">Client 1</option>
      <option value="2">Client 2</option>
      <option value="3">Client 3</option>
    </select>
  </div>

  <div class="field col-span-2 flex items-end gap-x-5">
    <div class="text-base font-bold leading-[3.5rem] text-monsoon">or</div>
    <Button variant="outline" onClick={() => {}}>+ Client</Button>
  </div>

  <div class="field col-span-2">
    <label for="invoiceId">Invoice ID</label>
    <input class="input" type="text" name="invoiceId" id="invoiceId" />
  </div>

  <div class="field col-span-2">
    <label for="dueDate">Due date</label>
    <input class="input" type="date" name="dueDate" id="dueDate" />
  </div>

  <div class="field col-span-2 col-start-5">
    <label for="issueDate">Issue date</label>
    <input class="input" type="date" name="issueDate" id="issueDate" />
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
      >Notes <span class="font-normal">(optional, displayed on invoice)</span></label
    >
    <textarea class="textarea" name="notes" id="notes" />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <div class="field col-span-6">
    <label for="terms"
      >Terms <span class="font-normal">(optional, enter your terms and conditions)</span></label
    >
    <textarea class="textarea" name="terms" id="terms" />
    <div class="text-xs text-gray-400">
      Formatting tips: <strong>*bold*</strong>, <em>_italics_</em>.
    </div>
  </div>

  <div class="field col-span-2">
    <Button color="error" variant="text" iconLeft={Trash}>Delete</Button>
  </div>

  <div class="field col-span-4 flex justify-end gap-x-5">
    <Button variant="secondary">Cancel</Button>
    <Button>Save</Button>
  </div>
</form>
