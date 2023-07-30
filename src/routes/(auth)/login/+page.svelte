<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Alert from '$lib/components/Alert.svelte';

  let email: string;
  let password: string;
  let alertMessage = '';
</script>

<h1 class="auth-title">Login</h1>

<form>
  <Alert message={alertMessage} />
  <div class="field">
    <label for="email" class="label text-goldenFizz">Email</label>
    <input class="input" id="email" type="email" placeholder="Enter your email" bind:value={email}>
  </div>

  <div class="field">
    <div class="flex justify-between">
      <label for="password" class="label text-goldenFizz">Password</label>
      <a href="/forgot-password" class="text-sm text-white underline hover:no-underline">Forgot?</a>
    </div>
    <input class="input" id="password" type="password" placeholder="Enter your password" bind:value={password}>
  </div>

  <div class="field mt-10">
    <Button color="green" className="w-full text-center justify-center" isAnimated={true}>Login</Button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/signup" class="underline hover:no-underline">Don't have an account yet?</a>
    </p>
  </div>
</form>
