<script lang="ts">
  import { onMount } from 'svelte';
  import { adminCreateUser } from '$lib/pocketbase';
  import { isSuperUser } from '$lib/auth';
  import { goto } from '$app/navigation';
  import { t } from '$lib/i18n';

  let name = '';
  let email = '';
  let password = '';
  let confirm = '';
  let loading = false;
  let error: string | null = null;
  let success = false;

  onMount(() => {
    if (!isSuperUser()) {
      goto('/auth/login');
    }
  });

  async function handleSubmit() {
    loading = true;
    error = null;
    success = false;

    if (password !== confirm) {
      error = t('auth.register.error');
      loading = false;
      return;
    }

    const result = await adminCreateUser(email, password, confirm, name);
    loading = false;

    if (result.success) {
      success = true;
      // reset form
      name = '';
      email = '';
      password = '';
      confirm = '';
    } else {
      error = t('auth.register.error');
    }
  }
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col w-full max-w-md">
    <div class="card w-full shadow-xl bg-base-100">
      <div class="card-body p-8">
        <h2 class="card-title text-center mb-4">{t('auth.register.title')}</h2>
        {#if success}
          <div class="alert alert-success mb-4">
            <span>{t('auth.register.success')}</span>
          </div>
        {/if}
        {#if error}
          <div class="alert alert-error mb-4" role="alert">
            <span>{error}</span>
          </div>
        {/if}
        <form on:submit|preventDefault={handleSubmit}>
          <div class="space-y-4">
            <div class="form-control">
              <label class="label"><span class="label-text">{t('auth.register.nameLabel')}</span></label>
              <input type="text" bind:value={name} required placeholder={t('auth.register.namePlaceholder')} class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">{t('auth.register.emailLabel')}</span></label>
              <input type="email" bind:value={email} required placeholder={t('auth.register.emailPlaceholder')} class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">{t('auth.register.passwordLabel')}</span></label>
              <input type="password" bind:value={password} required placeholder={t('auth.register.passwordPlaceholder')} class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">{t('auth.register.confirmLabel')}</span></label>
              <input type="password" bind:value={confirm} required placeholder={t('auth.register.confirmPlaceholder')} class="input input-bordered" />
            </div>
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full" disabled={loading}>
              {#if loading}
                <span class="loading loading-lg"></span>
                <span class="ml-2">{t('auth.register.loading')}</span>
              {:else}
                {t('auth.register.button')}
              {/if}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>