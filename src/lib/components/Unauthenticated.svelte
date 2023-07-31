<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '../../api/supabase';
  import { goto } from '$app/navigation';
  import { displayError } from '$lib/utils/handleError';

  onMount(async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      displayError(error);
      await goto('/login');
      return;
    }

    if (session) {
      await goto('/invoices');
      return;
    }
  });
</script>

<slot />
