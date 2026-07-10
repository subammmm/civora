'use client';

import { useState, useEffect } from 'react';
import { useScholarships } from './useScholarships';

/**
 * ScholarshipsPage Component
 * 
 * Displays a filterable list of scholarships fetched from Supabase
 * with graceful fallback to static data.
 */
export default function ScholarshipsPage() {
  const {
    scholarships,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    count
  } = useScholarships();

  // Local filter state for controlled inputs
  const [localFilters, setLocalFilters] = useState({
    country: '',
    level: '',
    field: '',
    deadline: '',
  });

  // Handle filter change
  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    const filterKey = id.replace('-filter', '');

    setLocalFilters(prev => ({
      ...prev,
      [filterKey]: value,
    }));

    updateFilters({ [filterKey]: value || undefined });
  };

  // Handle reset filters
  const handleResetFilters = () => {
    setLocalFilters({
      country: '',
      level: '',
      field: '',
      deadline: '',
    });
    resetFilters();
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(localFilters).some(v => v);

  return (
    <main>
      <section className="section">
        <div className="container">
          {/* Filter Section */}
          <div className="card reveal">
            <h1 data-i18n="sch.title">
              <i className="fas fa-search icon-left" aria-hidden="true"></i>
              Filter Scholarships
            </h1>
            <p className="subtext" data-i18n="sch.demo_intro">
              Find the perfect scholarship by filtering by country, level, field, and deadline.
            </p>

            <div className="filter-section" style={{ marginTop: '2rem' }}>
              <select
                className="filter-select"
                id="country-filter"
                value={localFilters.country}
                onChange={handleFilterChange}
              >
                <option value="">
                  <i className="fas fa-globe" aria-hidden="true"></i> All Countries
                </option>
                <option value="usa">United States</option>
                <option value="canada">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="australia">Australia</option>
                <option value="germany">Germany</option>
                <option value="netherlands">Netherlands</option>
                <option value="france">France</option>
                <option value="south-korea">South Korea</option>
                <option value="japan">Japan</option>
                <option value="china">China</option>
                <option value="sweden">Sweden</option>
                <option value="new-zealand">New Zealand</option>
                <option value="turkey">Turkey</option>
                <option value="italy">Italy</option>
                <option value="europe">Europe (Multiple)</option>
                <option value="nepal">Nepal</option>
              </select>

              <select
                className="filter-select"
                id="level-filter"
                value={localFilters.level}
                onChange={handleFilterChange}
              >
                <option value="">
                  <i className="fas fa-graduation-cap" aria-hidden="true"></i> All Levels
                </option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="phd">PhD</option>
              </select>

              <select
                className="filter-select"
                id="field-filter"
                value={localFilters.field}
                onChange={handleFilterChange}
              >
                <option value="">
                  <i className="fas fa-book" aria-hidden="true"></i> All Fields
                </option>
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="medicine">Medicine</option>
                <option value="arts">Arts & Humanities</option>
                <option value="science">Science</option>
              </select>

              <select
                className="filter-select"
                id="deadline-filter"
                value={localFilters.deadline}
                onChange={handleFilterChange}
              >
                <option value="">
                  <i className="fas fa-calendar" aria-hidden="true"></i> All Deadlines
                </option>
                <option value="open">Applications Open</option>
                <option value="closing">Closing Soon</option>
                <option value="future">Future Deadlines</option>
              </select>
            </div>

            {/* Results count and reset button */}
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span className="subtext">
                {loading ? 'Loading...' : `Showing ${count} scholarship${count !== 1 ? 's' : ''}`}
              </span>
              {hasActiveFilters && (
                <button
                  className="linear-button"
                  onClick={handleResetFilters}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                >
                  <i className="fas fa-times icon-left" aria-hidden="true"></i>
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Scholarships Table */}
          <div className="card reveal">
            {/* Loading State */}
            {loading && (
              <div style={{
                textAlign: 'center',
                padding: '3rem',
                color: 'var(--text-secondary)'
              }}>
                <i
                  className="fas fa-spinner fa-spin"
                  style={{ fontSize: '2rem', marginBottom: '1rem' }}
                ></i>
                <p>Loading scholarships...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--warning)',
                background: 'rgba(255, 193, 7, 0.1)',
                borderRadius: '8px',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-exclamation-triangle" style={{ marginRight: '0.5rem' }}></i>
                Using offline data. {error}
              </div>
            )}

            {/* No Results Message */}
            {!loading && scholarships.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <i
                  className="fas fa-search"
                  style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}
                ></i>
                <h3>No scholarships match your criteria</h3>
                <p>
                  Try adjusting your filters or{' '}
                  <button
                    onClick={handleResetFilters}
                    className="linear-button"
                    style={{ display: 'inline-block', marginTop: '1rem' }}
                  >
                    Reset All Filters
                  </button>
                </p>
              </div>
            )}

            {/* Scholarships Table */}
            {!loading && scholarships.length > 0 && (
              <table className="linear-table" id="scholarships-table">
                <thead>
                  <tr className="scholarship-item">
                    <th data-i18n="sch.th_name">Scholarship</th>
                    <th>Country</th>
                    <th>Level</th>
                    <th>Field</th>
                    <th>Deadline</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="scholarships-tbody">
                  {scholarships.map((scholarship) => (
                    <tr
                      key={scholarship.id}
                      className="scholarship-item"
                      data-country={scholarship.countryCode}
                      data-level={scholarship.levelCode}
                      data-field={scholarship.fieldCode}
                      data-deadline={scholarship.deadlineCode}
                    >
                      <td>
                        <strong>{scholarship.name}</strong>
                        <br />
                        <span className="subtext">{scholarship.description}</span>
                      </td>
                      <td>{scholarship.country}</td>
                      <td>{scholarship.level}</td>
                      <td>{scholarship.field}</td>
                      <td>
                        <span style={{ color: 'var(--accent)' }}>{scholarship.deadline}</span>
                      </td>
                      <td>
                        <a
                          href={scholarship.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="linear-button"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                          aria-label={`Apply to ${scholarship.name}`}
                        >
                          <i className="fas fa-external-link-alt icon-left" aria-hidden="true"></i>
                          Apply
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Disclaimer */}
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              background: 'var(--bg-secondary)',
              borderRadius: '4px',
              borderLeft: '3px solid var(--accent)'
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <i className="fas fa-info-circle icon-left" aria-hidden="true"></i>
                <strong>Disclaimer:</strong> Deadlines listed as of October 2025; always verify with official sources before applying. Application cycles may vary by year.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
