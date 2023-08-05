<script lang="ts">
  import Snackbar from '$lib/components/Snackbar.svelte';
  import Navbar from '$lib/components/Navbar.svelte';
  import { counties } from '$lib/utils/counties';
  import Button from '$lib/components/Button.svelte';
  import Check from '$lib/components/Icon/Check.svelte';
  import { onMount } from 'svelte';
  import { loadSettings, settings, updateSettings } from '$lib/stores/settingsStore';
  import type { SettingsType } from '../../types/DTM';
  import Authenticated from '$lib/components/Authenticated.svelte';
  import { supabase } from '../../api/supabase';

  let invoiceDetailsLoading = false;
  let accountInfoLoading = false;
  let mySettings: SettingsType = {} as SettingsType;
  let accountEmail = '';

  onMount(async () => {
    await loadSettings();
    mySettings = { ...$settings };

    // get logged in user
    const { data } = await supabase.auth.getUser();
    accountEmail = data?.user?.email || '';
  })

  const handleInvoiceDetailsSubmit = async () => {
    invoiceDetailsLoading = true;
    await updateSettings(mySettings);
    invoiceDetailsLoading = false;
  }

  const handleUpdateAccountSubmit = () => {
    console.log('submitting account details');
  }
</script>

<Authenticated>
  <div class="grid min-h-screen grid-cols-12 bg-whisper md:gap-x-16">
    <Snackbar/>
    <Navbar />
    <main class="col-span-12 md:col-span-8 md:col-start-4 lg:col-span-6 lg:col-start-5 px-4 pt-4 md:pt-20">
      <h1 class="title">Invoice Details</h1>
      <p class="mb-8">This information gets included on each invoice</p>
      <form on:submit|preventDefault={handleInvoiceDetailsSubmit}>
        <fieldset disabled={accountInfoLoading || invoiceDetailsLoading} class="grid grid-cols-6 gap-x-5">
          <div class="field col-span-6">
            <label for="myName">Name</label>
            <input
              class="input"
              type="text"
              id="myName"
              name="myName"
              placeholder="Your name"
              bind:value={mySettings.name}
            />
          </div>

          <div class="field col-span-6">
            <label for="invoiceEmail">Send invoices from this Email</label>
            <input
              class="input"
              type="email"
              id="invoiceEmail"
              name="invoiceEmail"
              placeholder="Your email"
              bind:value={mySettings.email}
            />
          </div>

          <div class="field col-span-6">
            <label for="street">Address</label>
            <input
              class="input"
              type="text"
              id="street"
              name="street"
              placeholder="Your address"
              autocomplete="street-address"
              bind:value={mySettings.street}
            />
          </div>

          <div class="field col-span-6 md:col-span-2">
            <label for="city">City</label>
            <input
              class="input"
              type="text"
              id="city"
              name="city"
              placeholder="Your city"
              autocomplete="address-level2"
              bind:value={mySettings.city}
            />
          </div>

          <div class="field col-span-6 md:col-span-2">
            <label for="county">County</label>
            <select class="select" name="county" id="county" bind:value={mySettings.county}>
              <option value="">Select a county</option>
              {#each counties as county}
                <option value={county.value}>{county.label}</option>
              {/each}
            </select>
          </div>

          <div class="field col-span-6 md:col-span-2">
            <label for="postcode">Postcode</label>
            <input
              class="input"
              type="text"
              id="postcode"
              name="postcode"
              placeholder="Your postcode"
              autocomplete="postal-code"
              bind:value={mySettings.postCode}
            />
          </div>

          <div class="field col-span-6 flex justify-end">
            <Button
              type="submit"
              loading={invoiceDetailsLoading}
              iconRight={Check}
            >Save
            </Button>
          </div>

        </fieldset>
      </form>

      <div class="col-span-6">
        <h2 class="title">Update Account information</h2>
        <p class="mb-8">This information is used to login to your account</p>
        <form on:submit|preventDefault={handleUpdateAccountSubmit}>
          <fieldset disabled={accountInfoLoading || invoiceDetailsLoading} class="grid grid-cols-6 gap-x-5">
            <div class="field col-span-6 md:col-span-3">
              <label for="email">Email</label>
              <input
                class="input"
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                bind:value={accountEmail}
              />
            </div>

            <div class="field col-span-6 md:col-span-3">
              <label for="currentPassword">Current Password</label>
              <input
                class="input"
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="Current password"
                autocomplete="current-password"
              />
            </div>

            <div class="field col-span-6 md:col-span-3">
              <label for="newPassword">New Password</label>
              <input
                class="input"
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="New password"
                autocomplete="new-password"
              />
            </div>

            <div class="field col-span-6 md:col-span-3">
              <label for="confirmPassword">Confirm Password</label>
              <input
                class="input"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm password"
                autocomplete="new-password"
              />
            </div>

            <div class="field flex justify-end col-span-6">
              <Button
                type="submit"
                loading={accountInfoLoading}
                iconRight={Check}
              >Save
              </Button>
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  </div>
</Authenticated>

<style lang="postcss">
  .title {
    @apply mb-1 text-3xl font-black text-daisyBush;
  }
</style>
