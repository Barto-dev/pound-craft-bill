<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { createEventDispatcher } from 'svelte';
  import { deleteInvoice } from '$lib/stores/invoiceStore';
  import { snackBar } from '$lib/stores/snackBarStore';
  import type { InvoiceType } from '../../../types/DTM';

  const dispatch = createEventDispatcher();
  export let isModalShowing = false;
  export let invoice: InvoiceType;
  export let amount: string;

  const handleDeleteButtonClick = () => {
    deleteInvoice(invoice.id);
    dispatch('close');
  };
</script>

{#if isModalShowing}
  <Modal isVisible={isModalShowing} on:close>
    <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
      <p class="text-center text-xl font-bold text-daisyBush">
        Are you sure you want to delete this invoice to
        <span class="text-scarlet">{invoice?.client?.name}</span>
        for <span class="text-scarlet">{amount}</span>
      </p>
      <div class="flex gap-4">
        <Button variant="secondary" onClick={() => dispatch('close')}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteButtonClick}>Yes, Delete It</Button>
      </div>
    </div>
  </Modal>
{/if}
