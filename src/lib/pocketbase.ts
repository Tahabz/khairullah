import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';
import type { UsersRecord, SuperusersRecord, TypedPocketBase } from './types';
import { Collections } from './types';

// Create the PocketBase instance
// In development, PocketBase runs on port 8090 by default
// In production, we assume it's at the same host
const baseUrl = import.meta.env.DEV ? 'http://127.0.0.1:8090' : window.location.origin;
export const pb = new PocketBase(baseUrl) as TypedPocketBase;

// Create auth store to track authentication state
export const currentUser = writable<UsersRecord | SuperusersRecord | null>(null);
export const isAuthenticated = writable<boolean>(false);

// Initialize the auth store from any existing auth data
export function initializeAuth() {
    // Check if the user is already logged in
    if (pb.authStore.isValid) {
        const authData = pb.authStore.record as unknown as UsersRecord | SuperusersRecord;
        if (authData) {
            currentUser.set(authData);
            isAuthenticated.set(true);
        }
    }

    // Add a listener for auth state changes
    pb.authStore.onChange((token, model) => {
        isAuthenticated.set(pb.authStore.isValid);
        currentUser.set(model ? model as unknown as UsersRecord | SuperusersRecord : null);
    });
}

// Login function
export async function login(email: string, password: string) {
    try {
        let authData;
        // try normal user login
        try {
            authData = await pb.collection(Collections.Users).authWithPassword(email, password);
        } catch {
            // fallback to superuser login
            authData = await pb.collection(Collections.Superusers).authWithPassword(email, password);
        }
        const user = authData.record as UsersRecord | SuperusersRecord;
        currentUser.set(user);
        isAuthenticated.set(true);
        return { success: true, user };
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

// Create user as admin (superuser only) without logging in
export async function adminCreateUser(
    email: string,
    password: string,
    passwordConfirm: string,
    name: string
) {
    try {
        const data = { email, password, passwordConfirm, name };
        const newUser = await pb.collection(Collections.Users).create(data);
        return { success: true, user: newUser as unknown as UsersRecord };
    } catch (error) {
        console.error('Admin create user failed:', error);
        return { success: false, error };
    }
}
