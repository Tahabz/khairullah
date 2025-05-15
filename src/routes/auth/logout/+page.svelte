<!-- filepath: src/routes/auth/logout/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { logout } from '$lib/pocketbase';
  import { t } from '$lib/i18n';
  import { goto } from '$app/navigation';

  onMount(() => {
    logout();
    goto('/auth/login');
  });
</script>

<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col">
    <div class="card w-80 bg-base-100 shadow-xl">
      <div class="card-body items-center text-center">
        <span class="loading loading-lg"></span>
        <h2 class="card-title mt-4">{t('auth.logout.message')}</h2>
      </div>
    </div>
  </div>
</div>
