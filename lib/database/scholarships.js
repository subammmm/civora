/**
 * Scholarships Database Operations
 * 
 * This module provides all database operations for scholarships,
 * with fallback to static data when Supabase is unavailable.
 */

import { supabase, isSupabaseConfigured, createServerSupabaseClient } from '../supabase';
import { scholarships as staticScholarships } from '../../app/scholarships/scholarships-data';

/**
 * Fetch all scholarships from Supabase
 * Falls back to static data if Supabase is not configured or fails
 * 
 * @param {Object} filters - Optional filters for scholarships
 * @param {string} filters.country - Filter by country code
 * @param {string} filters.level - Filter by education level
 * @param {string} filters.field - Filter by field of study
 * @param {string} filters.deadline - Filter by deadline status
 * @returns {Promise<Array>} Array of scholarship objects
 */
export async function getScholarships(filters = {}) {
    // If Supabase is not configured, return static data
    if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, using static scholarship data');
        return filterScholarships(staticScholarships, filters);
    }

    try {
        let query = supabase
            .from('scholarships')
            .select('*')
            .order('deadline', { ascending: true });

        // Apply filters
        if (filters.country) {
            query = query.eq('country_code', filters.country);
        }
        if (filters.level) {
            query = query.eq('level_code', filters.level);
        }
        if (filters.field) {
            query = query.eq('field_code', filters.field);
        }
        if (filters.deadline) {
            query = query.eq('deadline_code', filters.deadline);
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching scholarships from Supabase:', error);
            return filterScholarships(staticScholarships, filters);
        }

        // Transform Supabase data to match frontend format
        return data.map(transformScholarship);
    } catch (error) {
        console.error('Supabase connection error:', error);
        return filterScholarships(staticScholarships, filters);
    }
}

/**
 * Get a single scholarship by ID
 * 
 * @param {string} id - Scholarship ID
 * @returns {Promise<Object|null>} Scholarship object or null
 */
export async function getScholarshipById(id) {
    if (!isSupabaseConfigured()) {
        return staticScholarships.find(s => s.id === id) || null;
    }

    try {
        const { data, error } = await supabase
            .from('scholarships')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching scholarship:', error);
            return staticScholarships.find(s => s.id === id) || null;
        }

        return transformScholarship(data);
    } catch (error) {
        console.error('Supabase connection error:', error);
        return staticScholarships.find(s => s.id === id) || null;
    }
}

/**
 * Create a new scholarship
 * 
 * @param {Object} scholarship - Scholarship data
 * @returns {Promise<Object>} Created scholarship
 */
export async function createScholarship(scholarship) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Cannot create scholarship.');
    }

    const { data, error } = await supabase
        .from('scholarships')
        .insert([transformToDbFormat(scholarship)])
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to create scholarship: ${error.message}`);
    }

    return transformScholarship(data);
}

/**
 * Update an existing scholarship
 * 
 * @param {string} id - Scholarship ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated scholarship
 */
export async function updateScholarship(id, updates) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Cannot update scholarship.');
    }

    const { data, error } = await supabase
        .from('scholarships')
        .update(transformToDbFormat(updates))
        .eq('id', id)
        .select()
        .single();

    if (error) {
        throw new Error(`Failed to update scholarship: ${error.message}`);
    }

    return transformScholarship(data);
}

/**
 * Delete a scholarship
 * 
 * @param {string} id - Scholarship ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteScholarship(id) {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Cannot delete scholarship.');
    }

    const { error } = await supabase
        .from('scholarships')
        .delete()
        .eq('id', id);

    if (error) {
        throw new Error(`Failed to delete scholarship: ${error.message}`);
    }

    return true;
}

/**
 * Seed the database with static scholarship data
 * Use this to initialize or reset the database
 * Uses service role key to bypass RLS
 * 
 * @returns {Promise<number>} Number of scholarships inserted
 */
export async function seedScholarships() {
    if (!isSupabaseConfigured()) {
        throw new Error('Supabase not configured. Cannot seed scholarships.');
    }

    // Use server client with service role to bypass RLS
    const serverClient = createServerSupabaseClient();
    if (!serverClient) {
        throw new Error('Service role key not configured. Cannot seed scholarships.');
    }

    const dbRecords = staticScholarships.map(transformToDbFormat);

    const { data, error } = await serverClient
        .from('scholarships')
        .upsert(dbRecords, { onConflict: 'id' })
        .select();

    if (error) {
        throw new Error(`Failed to seed scholarships: ${error.message}`);
    }

    return data.length;
}

/**
 * Get unique filter options from scholarships
 * 
 * @returns {Promise<Object>} Object with arrays of unique values for each filter
 */
export async function getFilterOptions() {
    const scholarships = await getScholarships();

    return {
        countries: [...new Set(scholarships.map(s => ({ code: s.countryCode, name: s.country })))],
        levels: [...new Set(scholarships.map(s => ({ code: s.levelCode, name: s.level })))],
        fields: [...new Set(scholarships.map(s => ({ code: s.fieldCode, name: s.field })))],
        deadlines: [
            { code: 'open', name: 'Applications Open' },
            { code: 'closing', name: 'Closing Soon' },
            { code: 'future', name: 'Future Deadlines' },
        ],
    };
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Transform database record to frontend format
 */
function transformScholarship(dbRecord) {
    return {
        id: dbRecord.id,
        name: dbRecord.name,
        description: dbRecord.description,
        country: dbRecord.country,
        countryCode: dbRecord.country_code,
        level: dbRecord.level,
        levelCode: dbRecord.level_code,
        field: dbRecord.field,
        fieldCode: dbRecord.field_code,
        deadline: dbRecord.deadline,
        deadlineCode: dbRecord.deadline_code,
        url: dbRecord.url,
        createdAt: dbRecord.created_at,
        updatedAt: dbRecord.updated_at,
    };
}

/**
 * Transform frontend format to database format
 */
function transformToDbFormat(scholarship) {
    return {
        id: scholarship.id,
        name: scholarship.name,
        description: scholarship.description,
        country: scholarship.country,
        country_code: scholarship.countryCode,
        level: scholarship.level,
        level_code: scholarship.levelCode,
        field: scholarship.field,
        field_code: scholarship.fieldCode,
        deadline: scholarship.deadline,
        deadline_code: scholarship.deadlineCode,
        url: scholarship.url,
    };
}

/**
 * Filter static scholarships based on criteria
 */
function filterScholarships(scholarships, filters) {
    return scholarships.filter(s => {
        if (filters.country && s.countryCode !== filters.country) return false;
        if (filters.level && s.levelCode !== filters.level) return false;
        if (filters.field && s.fieldCode !== filters.field) return false;
        if (filters.deadline && s.deadlineCode !== filters.deadline) return false;
        return true;
    });
}
