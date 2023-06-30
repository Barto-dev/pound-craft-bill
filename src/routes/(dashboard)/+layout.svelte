<div class="grid min-h-screen grid-cols-12 gap-x-12 bg-whisper">
  <header class="col-span-3 bg-daisyBush text-center">
    <div>
      <a href="/invoices">
        <img src="/images/logo.svg" alt="Pound Bill Craft" class="mx-auto" />
      </a>
    </div>
    <nav aria-label="Main navigation" class="nav">
      <ul class="list-none text-2xl font-bold">
        <li class="">
          <a href="/invoices" aria-current="page">Invoices</a>
        </li>
        <li class="">
          <a href="/clients">Clients</a>
        </li>
        <li class="">
          <a href="/settings">Settings</a>
        </li>
        <li class="">
          <a href="/logout">Logout</a>
        </li>
      </ul>
    </nav>
  </header>
  <main class="col-span-8 pt-10">
    <slot />
  </main>
</div>

<style lang="postcss">
  .nav li {
    @apply mb-6;
  }

  .nav a {
    @apply font-bold text-white hover:text-goldenFizz;
  }
</style>
