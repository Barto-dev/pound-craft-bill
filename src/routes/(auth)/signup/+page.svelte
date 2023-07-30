<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { signUp } from '../../../api/auth';
  import { snackBar } from '$lib/stores/snackBarStore';
  import Alert from '$lib/components/Alert.svelte';
  import { goto } from '$app/navigation';
  import Loader from '$lib/components/Loader.svelte';
  import { addSettingsToDatabase } from '../../../api/settings';
  import type { SettingsType } from '../../../types/DTM';
  let fullName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let isSignupShowing = true;
  let isLoading = false;

  const handleSubmit = async () => {
    // make sure passwords match
    if (password !== confirmPassword) {
      snackBar.send({
        message: 'Your password and confirmation password do not match.',
        type: 'error',
        autoHide: false,
      })
      return;
    }
    isLoading = true;
    const signupData = { email, password };
    const userResult = await signUp(signupData);
    if (userResult?.user?.id) {
      isSignupShowing = false;
      const createdUserId = userResult.user.id;
      await addSettingsToDatabase({
        userId: createdUserId,
        name: fullName,
        email: email,
      } as SettingsType);
    }
    isLoading = false;
  };

  const redirectToLogin = () => {
    goto('/login');
  }
</script>

{#if isSignupShowing}
<h1 class="auth-title">Sign Up</h1>
<form on:submit|preventDefault={handleSubmit}>
  <fieldset disabled={isLoading}>
    <div class="field">
      <label for="fullName" class="text-goldenFizz">Full Name</label>
      <input
        class="input"
        type="text"
        name="fullName"
        id="fullName"
        required
        bind:value={fullName}
      />
    </div>

    <div class="field">
      <label for="email" class="text-goldenFizz">Email Address</label>
      <input
        class="input"
        type="email"
        name="email"
        id="email"
        required
        bind:value={email}
      />
    </div>

    <div class="field">
      <label for="password" class="text-goldenFizz">Password</label>
      <input
        class="input"
        type="password"
        name="password"
        id="password"
        autocomplete="new-password"
        required
        bind:value={password}
      />
    </div>

    <div class="field">
      <label for="confirmPassword" class="text-goldenFizz">Confirm Password</label>
      <input
        class="input"
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        autocomplete="new-password"
        required
        bind:value={confirmPassword}
      />
    </div>

    <Button
      color="green"
      type="submit"
      className="w-full justify-center"
    >
      {#if isLoading}
        <Loader />
      {:else }
        Count me in!
      {/if}
    </Button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/login" class="underline hover:no-underline">Already have an account?</a>
    </p>
  </fieldset>
</form>
{:else}
  <Alert message="Check your email for the confirmation link" />
  <Button
    color="green"
    onClick={redirectToLogin}
    className="w-full justify-center"
  >Login
  </Button>
{/if}
