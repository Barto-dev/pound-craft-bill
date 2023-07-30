<script lang="ts">
  import Button from '$lib/components/Button.svelte';

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };
</script>

<h1 class="auth-title">Sign Up</h1>

<form>
  <div class="field">
    <label for="fullName" class="text-goldenFizz">Full Name</label>
    <input class="input" type="text" name="fullName" id="fullName" required />
  </div>

  <div class="field">
    <label for="email" class="text-goldenFizz">Email Address</label>
    <input class="input" type="email" name="email" id="email" required />
  </div>

  <div class="field">
    <label for="password" class="text-goldenFizz">Password</label>
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

  <Button color="green" type="submit" className="w-full justify-center">Count me in!</Button>
  <p class="mt-4 text-center text-sm text-white">
    <a href="/login" class="underline hover:no-underline">Already have an account?</a>
  </p>
</form>
