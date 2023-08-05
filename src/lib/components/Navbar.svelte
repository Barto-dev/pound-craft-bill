<script lang="ts">
  import { page } from '$app/stores';
  import Close from '$lib/components/Icon/Close.svelte';
  import Hamburger from '$lib/components/Icon/Hamburger.svelte';

  let isNavShowing = false;
</script>

<svelte:head>
  {#if isNavShowing}
    <style lang="postcss">
      body {
        @apply overflow-hidden md:overflow-auto;
      }
    </style>
  {/if}
</svelte:head>

<!--Mobile nav control-->
<button
  class="fixed right-6 top-6 z-navBarToggle md:hidden"
  on:click={() => (isNavShowing = !isNavShowing)}
  class:text-goldenFizz={isNavShowing}
  class:text-daisyBush={!isNavShowing}
>
  {#if isNavShowing}
    <Close width={32} height={32} />
  {:else}
    <Hamburger width={32} height={32} />
  {/if}
</button>

<header
  class="fixed top-0 z-navBar col-span-3 h-screen w-full -translate-x-full bg-daisyBush text-center transition-transform md:sticky md:translate-x-0"
  class:translate-x-0={isNavShowing}
>
  <div class="mb-10 mt-10 md:mb-24">
    <a href="/invoices" class="relative">
      <div class="logo-text">Pound Bill Craft</div>
      <img src="/images/logo.svg" alt="Pound Bill Craft" class="mx-auto" />
    </a>
  </div>
  <nav aria-label="Main navigation" class="nav">
    <ul class="list-none text-2xl font-bold">
      <!--      TODO add aria current-->
      <li><a class:active={$page.url.pathname.includes('/invoices')} href="/invoices">Invoices</a></li>
      <li><a class:active={$page.url.pathname.includes('/clients')} href="/clients">Clients</a></li>
      <li><a class:active={$page.url.pathname === '/settings'} href="/settings">Settings</a></li>
      <li><a href="/logout">Logout</a></li>
    </ul>
  </nav>
</header>

<style lang="postcss">
  .nav li {
    @apply mb-6;
  }

  .nav a {
    @apply font-bold text-white hover:text-goldenFizz;
  }

  .nav a.active {
    @apply px-8 text-robinEggBlue transition-[padding];
    background: url('/images/active-nav-left.svg') left top no-repeat,
      url('/images/active-nav-right.svg') right top no-repeat;
  }

  .nav a.active:hover {
    @apply px-9;
  }

  .logo-text {
    word-spacing: 1000px;
    @apply
    text-goldenFizz
    text-7xl
    md:text-4xl
    lg:text-5xl
    xl:text-7xl
    font-black
    absolute
    top-[50%]
    -translate-y-[50%];
  }
</style>
