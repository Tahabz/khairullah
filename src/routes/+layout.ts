import { get } from 'svelte/store';
import { isAuthenticated } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

// No SSR, handled client-side
export const ssr = false;
export const prerender = false;
export const trailingSlash = 'never';

export const load: LayoutLoad = ({ url }) => {
  const path = url.pathname;
  const auth = get(isAuthenticated);

  // If not authenticated and not on auth routes, redirect to login
  if (!path.startsWith('/auth') && !auth) {
    throw redirect(307, '/auth/login');
  }

  // If authenticated and on auth routes, redirect to home
  if (path.startsWith('/auth') && auth) {
    throw redirect(307, '/');
  }
};