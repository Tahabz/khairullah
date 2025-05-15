<!-- filepath: src/routes/auth/login/+page.svelte -->
<script lang="ts">
  import { login } from '$lib/pocketbase';
  import { goto } from '$app/navigation';
  import { t } from '$lib/i18n';
  let email = '';
  let password = '';
  let loading = false;
  let error: string | null = null;

  async function handleSubmit() {
    loading = true;
    error = null;
    const result = await login(email, password);
    loading = false;
    if (result.success) {
      goto('/');
    } else {
      error = t('auth.login.error');
    }
  }
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content w-full max-w-md">
    <div class="card w-full shadow-lg bg-base-100">
      <div class="card-body">
        <h2 class="card-title">{t('auth.login.title')}</h2>
        {#if error}
          <div class="alert alert-error" role="alert">
            <span>{error}</span>
          </div>
        {/if}
        <form on:submit|preventDefault={handleSubmit}>
          <div class="form-control">
            <label class="label"><span class="label-text">{t('auth.login.emailLabel')}</span></label>
            <input
              type="email"
              bind:value={email}
              required
              placeholder={t('auth.login.emailPlaceholder')}
              class="input input-bordered"
            />
          </div>
          <div class="form-control mt-4">
            <label class="label"><span class="label-text">{t('auth.login.passwordLabel')}</span></label>
            <input
              type="password"
              bind:value={password}
              required
              placeholder={t('auth.login.passwordPlaceholder')}
              class="input input-bordered"
            />
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full" disabled={loading}>
              {#if loading}{t('auth.login.loading')}{:else}{t('auth.login.button')}{/if}
            </button>
          </div>
        </form>
        <p class="mt-4 text-center">
          <a href="/auth/reset-password" class="link">{t('auth.login.forgotPassword')}</a>
          <span> | </span>
          <a href="/auth/register" class="link">{t('auth.login.register')}</a>
        </p>
      </div>
    </div>
  </div>
</div>
