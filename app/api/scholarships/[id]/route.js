/**
 * Single Scholarship API Route
 * 
 * GET /api/scholarships/[id] - Get a specific scholarship
 * PUT /api/scholarships/[id] - Update a scholarship
 * DELETE /api/scholarships/[id] - Delete a scholarship
 */

import { NextResponse } from 'next/server';
import {
    getScholarshipById,
    updateScholarship,
    deleteScholarship
} from '../../../../lib/database/scholarships';

/**
 * GET /api/scholarships/[id]
 */
export async function GET(request, { params }) {
    try {
        const { id } = params;
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
        console.error(`GET /api/scholarships/${params.id} error:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch scholarship',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/scholarships/[id]
 */
export async function PUT(request, { params }) {
    try {
        const { id } = params;
        const body = await request.json();

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
        console.error(`PUT /api/scholarships/${params.id} error:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to update scholarship',
                message: error.message,
            },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/scholarships/[id]
 */
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

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
        console.error(`DELETE /api/scholarships/${params.id} error:`, error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to delete scholarship',
                message: error.message,
            },
            { status: 500 }
        );
    }
}
