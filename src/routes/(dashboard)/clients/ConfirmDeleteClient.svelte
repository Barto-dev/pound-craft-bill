<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Modal from '$lib/components/Modal.svelte';
  import { createEventDispatcher } from 'svelte';
  import type { ClientType } from '../../../types/DTM';
  import { deleteClient } from '$lib/stores/clientStore';

  const dispatch = createEventDispatcher();
  export let isModalShowing = false;
  export let client: ClientType;

  const handleDeleteButtonClick = async () => {
    await deleteClient(client.id);
    dispatch('close');
  };
</script>

{#if isModalShowing}
  <Modal isVisible={isModalShowing} on:close>
    <div class="flex h-full min-h-[175px] flex-col items-center justify-between gap-6">
      <p class="text-center text-xl font-bold text-daisyBush">
        Are you sure you want to delete this client
        <span class="text-scarlet">{client?.name}</span> and all their invoice(s)?
      </p>
      <div class="flex gap-4">
        <Button variant="secondary" onClick={() => dispatch('close')}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteButtonClick}>Yes, Delete It</Button>
      </div>
    </div>
  </Modal>
{/if}
