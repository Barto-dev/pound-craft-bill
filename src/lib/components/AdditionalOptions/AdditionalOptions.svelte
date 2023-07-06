<script lang="ts">
  import type { Option } from './AdditionalOptions.types';
  export let options: Option[];
</script>

<ul class="absolute left-0 top-4 z-additionalOptions rounded-lg bg-white shadow-lg">
  {#each options as option}
    {#if !option.disabled}
      <li>
        <button
          on:click={option.onClick}
          class="flex w-full items-center gap-4 p-4 font-sansSerif font-bold text-pastelPurple hover:text-daisyBush"
        >
          {#if option.icon}
            <svelte:component this={option.icon} />
          {/if}
          {option.label}
        </button>
      </li>
    {/if}
  {/each}
</ul>

<style lang="postcss">
  li {
    @apply border-b-2 border-whisper;
  }

  li:last-child {
    @apply border-b-0;
  }
</style>
