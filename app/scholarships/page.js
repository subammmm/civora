'use client';

import { useState, useMemo } from 'react';
import { scholarships } from './scholarships-data';

export default function ScholarshipsPage() {
  const [filters, setFilters] = useState({
    country: '',
    level: '',
    field: '',
  });

  const handleFilterChange = (e) => {
    const { id, value } = e.target;
    const filterKey = id.replace('-filter', '');
    setFilters(prev => ({ ...prev, [filterKey]: value }));
  };

  const resetFilters = () => {
    setFilters({ country: '', level: '', field: '' });
  };

  const filtered = useMemo(() => {
    return scholarships.filter(s => {
      if (filters.country && s.countryCode !== filters.country) return false;
      if (filters.level && s.levelCode !== filters.level) return false;
      if (filters.field && s.fieldCode !== filters.field) return false;
      return true;
    });
  }, [filters]);

  const hasActiveFilters = Object.values(filters).some(v => v);

  return (
    <main>
      <section className="section">
        <div className="container">
          {/* Header & Filters */}
          <div className="card">
            <h1>Scholarships</h1>
            <p className="subtext">
              Browse {scholarships.length} verified scholarships for Nepali students. All links go directly to official application portals.
            </p>

            <div className="filter-section" style={{ marginTop: '1.5rem' }}>
              <select
                className="filter-select"
                id="country-filter"
                value={filters.country}
                onChange={handleFilterChange}
              >
                <option value="">All Countries</option>
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
                value={filters.level}
                onChange={handleFilterChange}
              >
                <option value="">All Levels</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="graduate">Graduate</option>
                <option value="phd">PhD</option>
              </select>

              <select
                className="filter-select"
                id="field-filter"
                value={filters.field}
                onChange={handleFilterChange}
              >
                <option value="">All Fields</option>
                <option value="engineering">Engineering</option>
                <option value="all">General / All Fields</option>
              </select>
            </div>

            <div style={{
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span className="subtext">
                Showing {filtered.length} scholarship{filtered.length !== 1 ? 's' : ''}
              </span>
              {hasActiveFilters && (
                <button
                  className="linear-button secondary"
                  onClick={resetFilters}
                  style={{ padding: '0.4rem 1rem', fontSize: '0.8125rem' }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Scholarships Table */}
          <div className="card">
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#666' }}>
                <h3 style={{ color: '#333' }}>No scholarships match your filters</h3>
                <p>Try adjusting your filters or</p>
                <button
                  onClick={resetFilters}
                  className="linear-button"
                  style={{ marginTop: '1rem' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table className="linear-table" id="scholarships-table">
                  <thead>
                    <tr>
                      <th>Scholarship</th>
                      <th>Country</th>
                      <th>Level</th>
                      <th>Deadline</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id}>
                        <td>
                          <strong>{s.name}</strong>
                          <br />
                          <span className="subtext" style={{ fontSize: '0.8125rem' }}>{s.description}</span>
                        </td>
                        <td>{s.country}</td>
                        <td>{s.level}</td>
                        <td>
                          <span style={{ fontSize: '0.8125rem' }}>{s.deadline}</span>
                        </td>
                        <td>
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="linear-button"
                            style={{ padding: '0.4rem 0.875rem', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}
                            aria-label={`Apply to ${s.name}`}
                          >
                            Apply →
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: '#f5f5f5',
              borderRadius: '6px',
              borderLeft: '3px solid #000'
            }}>
              <p style={{ color: '#666', fontSize: '0.8125rem', marginBottom: 0 }}>
                <strong>Disclaimer:</strong> Deadlines are approximate and may vary by year. Always verify with the official scholarship website before applying.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
