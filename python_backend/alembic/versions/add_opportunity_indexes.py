"""
Database migrations for adding indexes
Issue #36 Fix - Performance optimization for Opportunity queries

Run with: alembic revision -m "add_opportunity_indexes"
Then: alembic upgrade head
"""

from alembic import op
import sqlalchemy as sa

def upgrade():
    # Add indexes to Opportunity table for common filter queries
    op.create_index('idx_opportunity_type', 'opportunities', ['type'])
    op.create_index('idx_opportunity_country', 'opportunities', ['country'])
    op.create_index('idx_opportunity_level', 'opportunities', ['level'])
    op.create_index('idx_opportunity_deadline', 'opportunities', ['deadline'])
    
    # Composite index for common query combinations
    op.create_index(
        'idx_opportunity_type_country', 
        'opportunities', 
        ['type', 'country']
    )
    
    # Full-text search indexes if using PostgreSQL
    # Uncomment if on PostgreSQL:
    # op.execute("""
    #     CREATE INDEX idx_opportunity_name_gin 
    #     ON opportunities 
    #     USING gin(to_tsvector('english', name))
    # """)

def downgrade():
    op.drop_index('idx_opportunity_deadline', 'opportunities')
    op.drop_index('idx_opportunity_level', 'opportunities')
    op.drop_index('idx_opportunity_country', 'opportunities')
    op.drop_index('idx_opportunity_type', 'opportunities')
    op.drop_index('idx_opportunity_type_country', 'opportunities')
    # op.drop_index('idx_opportunity_name_gin', 'opportunities')
