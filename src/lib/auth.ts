// filepath: src/lib/auth.ts
// Utility functions to check current user role
import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/types';

/**
 * Returns true if the currently authenticated record is a superuser (_superusers)
 */
export function isSuperUser(): boolean {
    const model = pb.authStore.record;
    return model?.collectionName === Collections.Superusers;
}

/**
 * Returns true if the currently authenticated record is a normal user (users)
 */
export function isNormalUser(): boolean {
    const model = pb.authStore.record;
    return model?.collectionName === Collections.Users;
}
