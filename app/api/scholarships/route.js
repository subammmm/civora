/**
 * Scholarships API Route
 * 
 * GET /api/scholarships - List all scholarships (with optional filters)
 * POST /api/scholarships - Create a new scholarship
 */

import { NextResponse } from 'next/server';
import {
    getScholarships,
    createScholarship,
    seedScholarships
} from '../../../lib/database/scholarships';

/**
 * GET /api/scholarships
 * 
 * Query parameters:
 * - country: Filter by country code
 * - level: Filter by education level
 * - field: Filter by field of study
 * - deadline: Filter by deadline status
 * - seed: If 'true', seed the database with static data
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Check if this is a seed request
        if (searchParams.get('seed') === 'true') {
            const count = await seedScholarships();
            return NextResponse.json({
                success: true,
                message: `Successfully seeded ${count} scholarships`,
                count,
            });
        }

        // Extract filters from query parameters
        const filters = {
            country: searchParams.get('country') || undefined,
            level: searchParams.get('level') || undefined,
            field: searchParams.get('field') || undefined,
            deadline: searchParams.get('deadline') || undefined,
        };

        // Remove undefined values
        Object.keys(filters).forEach(key => {
            if (filters[key] === undefined) delete filters[key];
        });

        const scholarships = await getScholarships(filters);

        return NextResponse.json({
            success: true,
            data: scholarships,
            count: scholarships.length,
            filters: Object.keys(filters).length > 0 ? filters : null,
        });
    } catch (error) {
        console.error('GET /api/scholarships error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch scholarships',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * POST /api/scholarships
 * 
 * Body: Scholarship object
 */
export async function POST(request) {
    try {
        const body = await request.json();

        // Basic validation
        const requiredFields = ['id', 'name', 'country', 'level', 'deadline', 'url'];
        const missingFields = requiredFields.filter(field => !body[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Missing required fields',
                    missingFields,
                },
                { status: 400 }
            );
        }

        const scholarship = await createScholarship(body);

        return NextResponse.json({
            success: true,
            data: scholarship,
            message: 'Scholarship created successfully',
        }, { status: 201 });
    } catch (error) {
        console.error('POST /api/scholarships error:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create scholarship',
                message: error.message,
            },
            { status: 500 }
        );
    }
}
