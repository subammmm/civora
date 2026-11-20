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
import { DEADLINE_FILTERS } from '../../../lib/deadlines';
import { rejectUnlessAdmin } from '../../../lib/admin-auth';

const CODE_PATTERN = /^[a-z0-9-]{1,40}$/;

/**
 * GET /api/scholarships
 * 
 * Query parameters:
 * - country: Filter by country code
 * - level: Filter by education level
 * - field: Filter by field of study
 * - deadline: open | passed | 30d (closing within 30 days)
 * - seed: If 'true', seed the database with static data
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Check if this is a seed request
        if (searchParams.get('seed') === 'true') {
            // Seeding writes with the service-role key and this route has no auth: local/dev only.
            if (process.env.NODE_ENV === 'production') {
                return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
            }
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

        const invalid = Object.keys(filters).filter(key =>
            key === 'deadline' ? !DEADLINE_FILTERS.includes(filters[key]) : !CODE_PATTERN.test(filters[key])
        );
        if (invalid.length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Invalid query parameters',
                    invalid,
                    hint: `deadline must be one of: ${DEADLINE_FILTERS.join(', ')}; other filters are lowercase codes`,
                },
                { status: 400 }
            );
        }

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
    const rejection = rejectUnlessAdmin(request);
    if (rejection) return rejection;

    try {
        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object') {
            return NextResponse.json({ success: false, error: 'Body must be a JSON object' }, { status: 400 });
        }

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
            },
            { status: 500 }
        );
    }
}
