<script lang="ts">
  import { onMount } from 'svelte';
  import { signOut } from '../../../api/auth';
  import { goto } from '$app/navigation';

  onMount(async () => {
    await signOut();
    await goto('/login');
  });
</script>
