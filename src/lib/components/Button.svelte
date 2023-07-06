<script lang="ts">
  export let onClick: () => void;
</script>

<button class="btn" on:click|preventDefault={onClick}>
  <slot />
</button>

<style lang="postcss">
  .btn {
    @apply relative
    translate-y-0
    whitespace-nowrap
    rounded-lg
    bg-lavenderIndigo
    px-5
    py-2
    font-sansSerif
    text-base
    font-black
    text-white
    shadow-colored
    transition-all
    hover:-translate-y-0.5
    hover:shadow-coloredHover
    lg:px-10
    lg:py-3
    lg:text-xl;
  }
</style>
