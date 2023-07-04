<script lang="ts">
  import cn from 'classnames';

  export let className: string;
</script>

<div>
  <header class={cn('table-header lg:invoice-item hidden', className)}>
    <h3>Status</h3>
    <h3>Due Date</h3>
    <h3>ID</h3>
    <h3>Client</h3>
    <h3 class="text-right">Amount</h3>
    <div />
    <div />
  </header>
</div>

<style lang="postcss">
  .table-header h3 {
    @apply text-xl font-black leading-snug;
  }
</style>
