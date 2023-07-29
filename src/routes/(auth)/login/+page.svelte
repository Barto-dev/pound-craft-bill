<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  let email: string;
  let password: string;
</script>

<h1 class="mb-4 text-[2.5rem] font-black text-goldenFizz">Login</h1>

<form>
  <div class="field">
    <label class="label text-goldenFizz">Email</label>
    <input class="input" type="email" placeholder="Enter your email" bind:value={email}>
  </div>

  <div class="field">
    <div class="flex justify-between">
      <label class="label text-goldenFizz">Password</label>
      <a href="/forgot-password" class="text-sm text-white underline hover:no-underline">Forgot?</a>
    </div>
    <input class="input" type="password" placeholder="Enter your password" bind:value={password}>
  </div>

  <div class="field mt-10">
    <Button color="green" className="w-full text-center justify-center" isAnimated="true">Login</Button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="underline hover:no-underline">Don't have an account yet?</a>
    </p>
  </div>
</form>
