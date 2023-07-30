<script lang="ts">
  import Button from '$lib/components/Button.svelte';
</script>

<h1 class="auth-title">Forgot Password</h1>

<form>
  <div class="field">
    <label for="email" class="text-goldenFizz">Email Address</label>
    <input type="email" class="input" name="email" id="email" placeholder="Your email">
  </div>

  <Button type="submit" color="green" className="justify-center w-full">Send me a Reset Email!</Button>
  <p class="mt-4 text-center text-sm text-white">
    <a href="/login" class="underline hover:no-underline">Ready to login?</a>
  </p>
</form>
