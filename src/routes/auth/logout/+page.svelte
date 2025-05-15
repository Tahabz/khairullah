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
  <div class="hero-content text-center">
    <div>
      <h2 class="text-2xl font-bold">{t('auth.logout.message')}</h2>
    </div>
  </div>
</div>
