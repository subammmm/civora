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
    seedScholarships,
    supabaseReadsEnabled
} from '../../../lib/database/scholarships';
import { DEADLINE_FILTERS } from '../../../lib/deadlines';
import { readFilters } from '../../../lib/scholarship-filters';
import { rejectUnlessAdmin } from '../../../lib/admin-auth';

/**
 * GET /api/scholarships
 * 
 * Query parameters:
 * - country: Filter by country code
 * - level: undergraduate | graduate | phd, or a degree level: bachelors | masters | phd
 * - field: Filter by field of study
 * - deadline: open | passed | 30d (closing within 30 days)
 * - seed: If 'true', seed the database with static data (development only, needs USE_SUPABASE_READS=true)
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Check if this is a seed request
        if (searchParams.get('seed') === 'true') {
            // Seeding writes with the service-role key and this route has no auth: local/dev only.
            if (process.env.NODE_ENV === 'production' || !supabaseReadsEnabled()) {
                return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
            }
            const count = await seedScholarships();
            return NextResponse.json({
                success: true,
                message: `Successfully seeded ${count} scholarships`,
                count,
            });
        }

        const { filters, invalid } = readFilters(searchParams);
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
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
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
