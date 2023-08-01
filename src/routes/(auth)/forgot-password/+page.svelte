<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { supabase } from '../../../api/supabase';
  import { snackBar } from '$lib/stores/snackBarStore';
  import { env } from '$env/dynamic/public';
  let email = '';
  let loading = false;

  const handleSubmit = async () => {
    loading = true;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${env.PUBLIC_URL}/reset-password`
    });
    if (error) {
      snackBar.send({
        message: error.message,
        type: 'error',
        autoHide: false,
      })
      loading = false;
      return;
    }
    snackBar.send({
      message: 'Check your email for the password reset link!',
      type: 'success',
      autoHide: false,
    })
    loading = false;
  }
</script>

<h1 class="auth-title">Forgot Password</h1>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset disabled={loading}>
    <div class="field">
      <label for="email" class="text-goldenFizz">Email Address</label>
      <input
        type="email"
        class="input"
        name="email"
        id="email"
        placeholder="Your email"
        required
        bind:value={email}
      >
    </div>

    <Button
      type="submit"
      color="green"
      loading={loading}
      className="justify-center w-full"
    >
      Send me a Reset Email!
    </Button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/login" class="underline hover:no-underline">Ready to login?</a>
    </p>
  </fieldset>
</form>
