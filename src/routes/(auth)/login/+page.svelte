<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import Alert from '$lib/components/Alert.svelte';
  import { signIn } from '../../../api/auth';
  import Loader from '$lib/components/Loader.svelte';
  import { goto } from '$app/navigation';

  let email: string;
  let password: string;
  let alertMessage = '';
  let isLoading = false;

  const handleSubmit = async () => {
    isLoading = true;
    const userData = await signIn({ email, password });
    isLoading = false;
    if (userData) {
      console.log(userData);
      await goto('/invoices')
    }
  }
</script>

<h1 class="auth-title">Login</h1>

<form on:submit|preventDefault={handleSubmit}>
  <Alert message={alertMessage} />
  <fieldset disabled={isLoading}>
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
      <Button
        type="submit"
        color="green"
        className="w-full text-center justify-center"
        isAnimated={true}
      >
        {#if isLoading}
          <Loader />
        {:else }
          Login
        {/if}
      </Button>
      <p class="mt-4 text-center text-sm text-white">
        <a href="/signup" class="underline hover:no-underline">Don't have an account yet?</a>
      </p>
    </div>
  </fieldset>
</form>
