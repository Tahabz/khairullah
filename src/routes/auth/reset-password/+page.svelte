<script lang="ts">
  import { requestPasswordReset } from '$lib/pocketbase';
  import { t } from '$lib/i18n';
  import { goto } from '$app/navigation';

  let email = '';
  let loading = false;
  let success = false;
  let error: string | null = null;

  async function handleSubmit() {
    loading = true;
    error = null;
    success = false;
    const result = await requestPasswordReset(email);
    loading = false;
    if (result.success) {
      success = true;
      // redirect back to login after showing success
      setTimeout(() => goto('/auth/login'), 2000);
    } else {
      error = t('auth.reset.error');
    }
  }
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col w-full max-w-md">
    <div class="card w-full shadow-xl bg-base-100">
      <div class="card-body p-8">
        <h2 class="card-title text-center mb-4">{t('auth.reset.title')}</h2>

        {#if success}
          <div class="alert alert-success mb-4" role="alert">
            <span>{t('auth.reset.success')}</span>
          </div>
        {/if}

        {#if error}
          <div class="alert alert-error mb-4" role="alert">
            <span>{error}</span>
          </div>
        {/if}

        <form on:submit|preventDefault={handleSubmit}>
          <div class="form-control">
            <label for="email" class="label">
              <span class="label-text">{t('auth.reset.emailLabel')}</span>
            </label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder={t('auth.reset.emailPlaceholder')}
              class="input input-bordered"
              required
            />
          </div>

          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary w-full" disabled={loading}>
              {#if loading}
                <span class="loading loading-lg"></span>
                <span class="ml-2">{t('auth.reset.button')}</span>
              {:else}
                {t('auth.reset.button')}
              {/if}
            </button>
          </div>
        </form>

        <p class="mt-4 text-center">
          <a on:click={() => goto('/auth/login')} class="link">{t('auth.login.button')}</a>
        </p>
      </div>
    </div>
  </div>
</div>