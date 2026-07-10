/**
 * useScholarships Hook
 * 
 * React hook for fetching and managing scholarships data
 * with support for filtering and loading states.
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching scholarships
 * 
 * @param {Object} initialFilters - Initial filter values
 * @returns {Object} Scholarships data and control functions
 */
export function useScholarships(initialFilters = {}) {
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState(initialFilters);

    /**
     * Fetch scholarships from API
     */
    const fetchScholarships = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Build query string from filters
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) params.append(key, value);
            });

            const queryString = params.toString();
            const url = `/api/scholarships${queryString ? `?${queryString}` : ''}`;

            const response = await fetch(url);
            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to fetch scholarships');
            }

            setScholarships(data.data);
        } catch (err) {
            console.error('Error fetching scholarships:', err);
            setError(err.message);

            // Fall back to importing static data directly
            try {
                const { scholarships: staticData } = await import('../scholarships/scholarships-data');
                setScholarships(filterStaticData(staticData, filters));
            } catch {
                setScholarships([]);
            }
        } finally {
            setLoading(false);
        }
    }, [filters]);

    /**
     * Update filters and trigger refetch
     */
    const updateFilters = useCallback((newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
        }));
    }, []);

    /**
     * Reset all filters
     */
    const resetFilters = useCallback(() => {
        setFilters({});
    }, []);

    /**
     * Refresh scholarships data
     */
    const refresh = useCallback(() => {
        fetchScholarships();
    }, [fetchScholarships]);

    // Fetch on mount and when filters change
    useEffect(() => {
        fetchScholarships();
    }, [fetchScholarships]);

    return {
        scholarships,
        loading,
        error,
        filters,
        updateFilters,
        resetFilters,
        refresh,
        count: scholarships.length,
    };
}

/**
 * Filter static data (fallback when API fails)
 */
function filterStaticData(scholarships, filters) {
    return scholarships.filter(s => {
        if (filters.country && s.countryCode !== filters.country) return false;
        if (filters.level && s.levelCode !== filters.level) return false;
        if (filters.field && s.fieldCode !== filters.field) return false;
        if (filters.deadline && s.deadlineCode !== filters.deadline) return false;
        return true;
    });
}

export default useScholarships;
