import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import type { UsersRecord, TypedPocketBase } from './types';

// Create the PocketBase instance
// In development, PocketBase runs on port 8090 by default
// In production, we assume it's at the same host
const baseUrl = import.meta.env.DEV ? 'http://127.0.0.1:8090' : window.location.origin;
export const pb = new PocketBase(baseUrl) as TypedPocketBase;

// Create auth store to track authentication state
export const currentUser = writable<UsersRecord | null>(null);
export const isAuthenticated = writable<boolean>(false);

// Initialize the auth store from any existing auth data
export function initializeAuth() {
    // Check if the user is already logged in
    if (pb.authStore.isValid) {
        const authData = pb.authStore.record as unknown as UsersRecord;
        if (authData) {
            currentUser.set(authData);
            isAuthenticated.set(true);
        }
    }

    // Add a listener for auth state changes
    pb.authStore.onChange((token, model) => {
        isAuthenticated.set(pb.authStore.isValid);
        currentUser.set(model ? model as unknown as UsersRecord : null);
    });
}

// Login function
export async function login(email: string, password: string) {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        currentUser.set(authData.record as UsersRecord);
        isAuthenticated.set(true);
        return { success: true, user: authData.record };
    } catch (error) {
        console.error('Login failed:', error);
        return { success: false, error };
    }
}

// Register function
export async function register(email: string, password: string, passwordConfirm: string, name: string) {
    try {
        const data = {
            email,
            password,
            passwordConfirm,
            name
        };
        await pb.collection('users').create(data);

        // After registration, login the user
        return await login(email, password);
    } catch (error) {
        console.error('Registration failed:', error);
        return { success: false, error };
    }
}

// Logout function
export function logout() {
    pb.authStore.clear();
    currentUser.set(null);
    isAuthenticated.set(false);
}

// Password reset request
export async function requestPasswordReset(email: string) {
    try {
        await pb.collection('users').requestPasswordReset(email);
        return { success: true };
    } catch (error) {
        console.error('Password reset request failed:', error);
        return { success: false, error };
    }
}

// Confirm password reset
export async function confirmPasswordReset(
    token: string,
    password: string,
    passwordConfirm: string
) {
    try {
        await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
        return { success: true };
    } catch (error) {
        console.error('Password reset confirmation failed:', error);
        return { success: false, error };
    }
}
