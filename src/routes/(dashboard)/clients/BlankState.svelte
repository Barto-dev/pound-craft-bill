<script lang="ts">
  import BlankRow from '$lib/components/BlankRow.svelte';
  import ClientRowHeader from './ClientRowHeader.svelte';
</script>

<div>
  <div class="-mt-10 md:-mt-4 lg:-mt-14">
    <h2 class="title">Add Your First Client</h2>
  </div>
  <ClientRowHeader className="text-fog" />
  <BlankRow />
  <BlankRow />
  <BlankRow />
</div>

<style lang="postcss">
  .title {
    @apply mb-10
    ml-6
    bg-arrowLeftUp
    bg-left
    bg-no-repeat
    pl-28
    pt-14
    font-handwriting
    text-2xl
    font-bold
    text-caribbeanGreen
    md:ml-0
    md:mr-2
    md:bg-arrowRightUp
    md:bg-right
    md:pl-0
    md:pr-28
    md:text-right
    md:text-4xl
    lg:mr-10;
  }
</style>
