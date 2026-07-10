/**
 * Supabase Client Configuration
 * 
 * This module provides the Supabase client for database operations.
 * Supports both server-side and client-side usage.
 * 
 * IMPORTANT: The app gracefully degrades when Supabase is not configured.
 * All database operations will fall back to static data.
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables for Supabase connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Log warning only once in development
if (!isConfigured && typeof window === 'undefined') {
    console.warn(
        '[Civora] Supabase not configured. Using static data fallback. ' +
        'To enable database features, set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
    );
}

/**
 * Supabase client instance for public/anonymous operations
 * Returns null if not configured - always check with isSupabaseConfigured() first
 */
let supabaseClient = null;

if (isConfigured) {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    });
}

export const supabase = supabaseClient;

/**
 * Create a Supabase client for server-side operations
 * This uses the service role key for admin operations
 * 
 * @returns {Object|null} Supabase client or null if not configured
 */
export function createServerSupabaseClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        console.warn(
            '[Civora] Server Supabase client requires SUPABASE_SERVICE_ROLE_KEY'
        );
        return null;
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });
}

/**
 * Check if Supabase is properly configured
 * Always call this before attempting database operations
 * 
 * @returns {boolean} True if Supabase is configured
 */
export function isSupabaseConfigured() {
    return isConfigured;
}

/**
 * Get the Supabase client with a safety check
 * Throws an error if called when Supabase is not configured
 * 
 * @returns {Object} Supabase client
 * @throws {Error} If Supabase is not configured
 */
export function getSupabaseClient() {
    if (!isConfigured || !supabaseClient) {
        throw new Error('Supabase is not configured. Check your environment variables.');
    }
    return supabaseClient;
}

export default supabase;
