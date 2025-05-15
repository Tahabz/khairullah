<script lang="ts">
  import { page } from '$app/stores';
  import { confirmPasswordReset } from '$lib/pocketbase';
  import { t } from '$lib/i18n';
  import { goto } from '$app/navigation';

  let token: string;
  $: token = $page.url.searchParams.get('token') || '';
  let password = '';
  let confirm = '';
  let loading = false;
  let success = false;
  let error: string | null = null;

  async function handleSubmit() {
    loading = true;
    error = null;
    success = false;
    if (password !== confirm) {
      error = t('auth.confirm.error');
      loading = false;
      return;
    }
    const result = await confirmPasswordReset(token, password, confirm);
    loading = false;
    if (result.success) {
      success = true;
      setTimeout(() => goto('/auth/login'), 2000);
    } else {
      error = t('auth.confirm.error');
    }
  }
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col w-full max-w-md">
    <div class="card w-full shadow-xl bg-base-100">
      <div class="card-body p-8">
        <h2 class="card-title text-center mb-4">{t('auth.confirm.title')}</h2>
        {#if success}
          <div class="alert alert-success mb-4">
            <span>{t('auth.confirm.success')}</span>
          </div>
        {/if}
        {#if error}
          <div class="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        {/if}
        <form on:submit|preventDefault={handleSubmit}>
          <div class="space-y-4">
            <div class="form-control">
              <label class="label" for="password"><span class="label-text">{t('auth.confirm.passwordLabel')}</span></label>
              <input
                id="password"
                type="password"
                bind:value={password}
                required
                placeholder={t('auth.confirm.passwordPlaceholder')}
                class="input input-bordered"
              />
            </div>
            <div class="form-control">
              <label class="label" for="confirm"><span class="label-text">{t('auth.confirm.confirmLabel')}</span></label>
              <input
                id="confirm"
                type="password"
                bind:value={confirm}
                required
                placeholder={t('auth.confirm.confirmPlaceholder')}
                class="input input-bordered"
              />
            </div>
          </div>
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full" disabled={loading}>
              {#if loading}
                <span class="loading loading-lg"></span>
                <span class="ml-2">{t('auth.confirm.button')}</span>
              {:else}
                {t('auth.confirm.button')}
              {/if}
            </button>
          </div>
        </form>
        <p class="mt-4 text-center">
          <a href="/auth/login" class="link">{t('auth.login.button')}</a>
        </p>
      </div>
    </div>
  </div>
</div>