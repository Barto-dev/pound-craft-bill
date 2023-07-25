<script lang="ts">
  import cn from 'classnames';
  export let className = '';
</script>

<div class={cn('client-table hidden lg:grid', className)}>
  <h3>Status</h3>
  <h3>Client</h3>
  <h3 class="text-center">Received</h3>
  <h3 class="text-center">Balance</h3>
  <div />
  <div />
</div>

<style lang="postcss">
  h3 {
    @apply text-xl font-black leading-snug text-daisyBush;
  }
</style>
