<script lang="ts">
  import Button from '$lib/components/Button.svelte';
  import { supabase } from '../../../api/supabase';
  import { snackBar } from '$lib/stores/snackBarStore';
  import { goto } from '$app/navigation';

  let newPassword = '';
  let confirmNewPassword = '';
  let loading = false;

  const handleSubmit = async () => {
    if (newPassword !== confirmNewPassword) {
      snackBar.send({ message: 'Passwords do not match', type: 'error' });
      return;
    }
    loading = true;
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      snackBar.send({ message: error.message, type: 'error' });
    } else {
      snackBar.send({ message: 'Password updated!', type: 'success' });
      await goto('/invoices');
    }
    loading = false;
  }
</script>

<h1 class="auth-title">Reset my Password</h1>

<form on:submit|preventDefault={handleSubmit}>
  <fieldset disabled={loading}>
    <div class="field">
      <label for="password" class="text-goldenFizz">New Password</label>
      <input
        class="input"
        type="password"
        name="password"
        id="password"
        autocomplete="new-password"
        bind:value={newPassword}
        required
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
        bind:value={confirmNewPassword}
      />
    </div>

    <Button
      type="submit"
      color="green"
      className="justify-center w-full"
      loading={loading}
    >Update my password!</Button>
    <p class="mt-4 text-center text-sm text-white">
      <a href="/login" class="underline hover:no-underline">Ready to login?</a>
    </p>
  </fieldset>
</form>
