<script lang="ts">
  import cn from 'classnames';
  import type { SvelteComponent } from 'svelte';

  export let onClick: () => void = () => {};
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'text' = 'primary';
  export let color: 'error' | 'primary' = 'primary';
  export let isAnimated = false;
  export let iconLeft: (new (...args: any[]) => SvelteComponent) | null = null;
  export let iconRight: (new (...args: any[]) => SvelteComponent) | null = null;
</script>

<button
  class={cn('btn')}
  {type}
  class:isAnimated
  class:primary={variant === 'primary'}
  class:secondary={variant === 'secondary'}
  class:danger={variant === 'danger'}
  class:outline={variant === 'outline'}
  class:text={variant === 'text'}
  class:errorText={color === 'error'}
  class:primaryText={color === 'primary'}
  on:click={onClick}
>
  {#if iconLeft}
    <span class="mr-2">
      <svelte:component this={iconLeft} />
    </span>
  {/if}
  <slot />
  {#if iconRight}
    <span class="ml-2">
      <svelte:component this={iconRight} />
    </span>
  {/if}
</button>

<style lang="postcss">
  .btn {
    @apply relative
    flex
    items-center
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
    @apply translate-y-0 hover:-translate-y-0.5 hover:shadow-coloredHover;
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

  .outline {
    @apply border-daisyBush text-daisyBush hover:bg-daisyBush hover:text-white;
  }

  .text {
    @apply bg-transparent px-0 underline hover:no-underline;
  }

  .text.errorText {
    @apply text-scarlet;
  }

  .text.primaryText {
    @apply text-lavenderIndigo;
  }
</style>
