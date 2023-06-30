<script>
  import { page } from '$app/stores';
</script>

<header class="col-span-3 bg-daisyBush text-center">
  <div>
    <a href="/invoices">
      <img src="/images/logo.svg" alt="Pound Bill Craft" class="mx-auto" />
    </a>
  </div>
  <nav aria-label="Main navigation" class="nav">
    <ul class="list-none text-2xl font-bold">
<!--      TODO add aria current-->
      <li><a class:active={$page.url.pathname === '/invoices'} href="/invoices">Invoices</a></li>
      <li><a class:active={$page.url.pathname === '/clients'} href="/clients">Clients</a></li>
      <li><a href="/settings">Settings</a></li>
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
</style>
