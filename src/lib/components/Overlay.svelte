<script lang="ts">
  import cn from 'classnames';
  import {fade} from 'svelte/transition';

  export let className: string = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  transition:fade={{duration: 300}}
  class={cn('fixed inset-0 z-overlay bg-blueGem opacity-60', className)}
/>
