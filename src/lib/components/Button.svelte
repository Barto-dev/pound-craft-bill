<script lang="ts">
  import cn from 'classnames';

  export let onClick: () => void;
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let isAnimated = false;
</script>

<button
  class={cn('btn')}
  class:isAnimated
  class:primary={variant === 'primary'}
  class:secondary={variant === 'secondary'}
  class:danger={variant === 'danger'}
  on:click|preventDefault={onClick}
>
  <slot />
</button>

<style lang="postcss">
  .btn {
    @apply relative
    whitespace-nowrap
    rounded-lg
    px-5
    py-2
    font-sansSerif
    text-base
    font-black
    shadow-colored
    transition-all
    lg:px-10
    lg:py-3
    lg:text-xl;
  }

  .isAnimated {
    @apply hover:-translate-y-0.5 translate-y-0 hover:shadow-coloredHover;
  }

  .primary {
    @apply bg-lavenderIndigo text-white;
  }

  .secondary {
    @apply bg-gallery text-daisyBush;
  }

  .danger {
    @apply bg-scarlet text-goldenFizz;
  }
</style>
