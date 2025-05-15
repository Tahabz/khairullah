<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <img src="/favicon.png" class="max-w-sm rounded-lg shadow-2xl" alt="Logo" />
    <div>
      <h1 class="text-5xl font-bold">{t('home.title')}</h1>
      <p class="py-6 text-lg">{t('home.subtitle')}</p>
      <div class="buttons">
        <a href="/auth/login" class="btn btn-primary btn-lg">{t('home.cta.login')}</a>
        <a href="/auth/register" class="btn btn-secondary btn-lg">{t('home.cta.register')}</a>
      </div>
    </div>
  </div>
</div>
