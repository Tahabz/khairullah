// filepath: src/hooks.client.ts
// This client-side hook initializes PocketBase authentication
import { initializeAuth } from '$lib/pocketbase';

// Initialize authentication state on app startup
initializeAuth();
