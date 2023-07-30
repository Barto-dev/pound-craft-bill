<script lang="ts">
  import cn from 'classnames';
  import {fade} from 'svelte/transition';

  export let onClick: () => void;
  export let className: string = '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  transition:fade={{duration: 300}}
  on:click={onClick} class={cn('fixed inset-0 z-overlay bg-blueGem opacity-60', className)}
/>
