<script lang="ts">
  export let onClick: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={onClick} class="fixed inset-0 bg-blueGem opacity-60 z-overlay" />
