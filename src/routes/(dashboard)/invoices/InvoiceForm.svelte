<script>
  import Button from '$lib/components/Button.svelte';
</script>

<h2 class="mb-7 font-sansSerif text-3xl font-bold text-daisyBush">Add an invoice</h2>
<form class="grid grid-cols-6 gap-x-5">
  <div class="field col-span-2">
    <label for="client">Client</label>
    <select name="client" id="client">
      <option value="1">Client 1</option>
      <option value="2">Client 2</option>
      <option value="3">Client 3</option>
    </select>
  </div>
  <div class="field col-span-3 flex items-end">
    <div class="text-base font-bold text-monsoon leading-[3.5rem]">or</div>
    <Button onClick={() => {}}>+ Client</Button>
  </div>
  <div>
    <label for="invoiceId">Invoice ID</label>
    <input type="text" name="invoiceId" id="invoiceId">
  </div>
  <div>
    <label for="dueDate">Due date</label>
    <input type="date" name="dueDate" id="dueDate">
  </div>
  <div>
    <label for="issueDate">Issue date</label>
    <input type="date" name="issueDate" id="issueDate">
  </div>
  <div>
    <label for="subject">Subject</label>
    <input type="text" name="subject" id="subject">
  </div>
<!--  line items-->
  <div>
    <label for="notes">Notes <span>(optional, displayed on invoice)</span></label>
    <textarea name="notes" id="notes"></textarea>
  </div>
  <div>
    <label for="terms">Terms <span>(optional, enter your terms and conditions)</span></label>
    <textarea name="terms" id="terms"></textarea>
  </div>
  <div>
    <button>Cancel</button>
    <button>Save</button>
  </div>
</form>
