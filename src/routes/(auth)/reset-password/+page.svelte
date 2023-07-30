<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<h1 class="auth-title">Reset my Password</h1>

<form>
  <div class="field">
    <label for="password" class="text-goldenFizz">New Password</label>
    <input
      class="input"
      type="password"
      name="password"
      id="password"
      autocomplete="new-password"
      required />
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
    />
  </div>

  <Button type="submit" color="green" className="justify-center w-full">Update my password!</Button>
  <p class="mt-4 text-center text-sm text-white">
    <a href="/login" class="underline hover:no-underline">Ready to login?</a>
  </p>
</form>
