<script lang="ts">
  import { tweened } from 'svelte/motion';
  import { onMount } from 'svelte';
  import { snackBar } from '$lib/stores/snackBarStore';
  let progress = tweened(100, { duration: 3000 });
  export let autoHide = true;

  onMount(async () => {
    if (!autoHide) {
      return;
    }
    await progress.set(0);
    snackBar.remove();
  });
</script>

<div class="whitespace-nowrap">
  <slot />
</div>
