/**
 * Single Scholarship API Route
 * 
 * GET /api/scholarships/[id] - Get a specific scholarship
 * PUT /api/scholarships/[id] - Update a scholarship (x-admin-token required)
 * DELETE /api/scholarships/[id] - Delete a scholarship (x-admin-token required)
 */

import { NextResponse } from 'next/server';
import {
    getScholarshipById,
    updateScholarship,
    deleteScholarship
} from '../../../../lib/database/scholarships';
import { rejectUnlessAdmin } from '../../../../lib/admin-auth';

/**
 * GET /api/scholarships/[id]
 */
export async function GET(request, { params }) {
    try {
        const { id } = await params;
        const scholarship = await getScholarshipById(id);

        if (!scholarship) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Scholarship not found',
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: scholarship,
        });
    } catch (error) {
        console.error(`GET /api/scholarships/[id] error:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch scholarship',
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/scholarships/[id]
 */
export async function PUT(request, { params }) {
    const rejection = rejectUnlessAdmin(request);
    if (rejection) return rejection;

    try {
        const { id } = await params;
        const body = await request.json().catch(() => null);
        if (!body || typeof body !== 'object' || Array.isArray(body)) {
            return NextResponse.json({ success: false, error: 'Body must be a JSON object' }, { status: 400 });
        }

        // Check if scholarship exists
        const existing = await getScholarshipById(id);
        if (!existing) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Scholarship not found',
                },
                { status: 404 }
            );
        }

        const scholarship = await updateScholarship(id, body);

        return NextResponse.json({
            success: true,
            data: scholarship,
            message: 'Scholarship updated successfully',
        });
    } catch (error) {
        console.error(`PUT /api/scholarships/[id] error:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update scholarship',
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/scholarships/[id]
 */
export async function DELETE(request, { params }) {
    const rejection = rejectUnlessAdmin(request);
    if (rejection) return rejection;

    try {
        const { id } = await params;

        // Check if scholarship exists
        const existing = await getScholarshipById(id);
        if (!existing) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Scholarship not found',
                },
                { status: 404 }
            );
        }

        await deleteScholarship(id);

        return NextResponse.json({
            success: true,
            message: 'Scholarship deleted successfully',
        });
    } catch (error) {
        console.error(`DELETE /api/scholarships/[id] error:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete scholarship',
            },
            { status: 500 }
        );
    }
}
