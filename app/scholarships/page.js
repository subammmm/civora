'use client';

import { useState, useMemo, useEffect } from 'react';
import { scholarships } from './scholarships-data';

const countryLabels = {
  usa: 'United States', uk: 'United Kingdom', germany: 'Germany', japan: 'Japan',
  'south-korea': 'South Korea', china: 'China', turkey: 'Turkey', australia: 'Australia',
  europe: 'Europe', canada: 'Canada', france: 'France', sweden: 'Sweden',
  'new-zealand': 'New Zealand', hungary: 'Hungary', netherlands: 'Netherlands', other: 'Various'
};

const getCountryLabel = (code) => countryLabels[code] || code;

export default function ScholarshipsPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ country: '', level: '', field: '', funding: '' });
  const [sort, setSort] = useState('deadline');
  const [savedIds, setSavedIds] = useState([]);
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('civora-saved') || '[]');
      setSavedIds(saved);
    } catch {}
  }, []);

  const toggleSave = (id) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem('civora-saved', JSON.stringify(next));
      return next;
    });
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({ country: '', level: '', field: '', funding: '' });
  };

  const hasActiveFilters = filters.country || filters.level || filters.field || filters.funding;

  const uniqueCountries = useMemo(() => {
    const codes = [...new Set(scholarships.map(s => s.countryCode))];
    return codes.sort((a, b) => getCountryLabel(a).localeCompare(getCountryLabel(b)));
  }, []);

  const filtered = useMemo(() => {
    let result = scholarships;

    if (showSaved) {
      result = result.filter(s => savedIds.includes(s.id));
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q) ||
        s.field.toLowerCase().includes(q) ||
        s.organizer.toLowerCase().includes(q)
      );
    }

    if (filters.country) result = result.filter(s => s.countryCode === filters.country);
    if (filters.level) result = result.filter(s => s.levelCode === filters.level);
    if (filters.funding) result = result.filter(s => s.fundingType === filters.funding);

    if (sort === 'deadline') {
      result = [...result].sort((a, b) => new Date(a.deadlineDate) - new Date(b.deadlineDate));
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, filters, sort, showSaved, savedIds]);

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Scholarships</h1>
          <p className="subtext">
            Browse {scholarships.length} verified scholarships for Nepali students. All links go directly to official application portals.
          </p>

          <input
            className="search-input"
            type="text"
            placeholder="Search by name, country, or field..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%' }}
          />

          <div className="tabs" style={{ marginTop: '1rem' }}>
            <button className={`tab ${!showSaved ? 'active' : ''}`} onClick={() => setShowSaved(false)}>
              All Scholarships ({scholarships.length})
            </button>
            <button className={`tab ${showSaved ? 'active' : ''}`} onClick={() => setShowSaved(true)}>
              ♥ Saved ({savedIds.length})
            </button>
          </div>

          <div className="filter-section" style={{ marginTop: '1.25rem' }}>
            <select
              className="filter-select"
              value={filters.country}
              onChange={(e) => updateFilter('country', e.target.value)}
            >
              <option value="">All Countries</option>
              {uniqueCountries.map(code => (
                <option key={code} value={code}>{getCountryLabel(code)}</option>
              ))}
            </select>

            <select
              className="filter-select"
              value={filters.level}
              onChange={(e) => updateFilter('level', e.target.value)}
            >
              <option value="">All Levels</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="phd">PhD</option>
            </select>

            <select
              className="filter-select"
              value={filters.funding}
              onChange={(e) => updateFilter('funding', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="fully-funded">Fully Funded</option>
              <option value="partial">Partial</option>
              <option value="stipend">Stipend</option>
            </select>

            <select
              className="filter-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="deadline">Deadline (Soonest)</option>
              <option value="name">Name (A-Z)</option>
            </select>

            {hasActiveFilters && (
              <button className="btn-outline btn-sm" onClick={clearAllFilters}>
                Clear All
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="filter-pills">
              {filters.country && (
                <span className="filter-pill">
                  Country: {getCountryLabel(filters.country)} <button onClick={() => updateFilter('country', '')}>×</button>
                </span>
              )}
              {filters.level && (
                <span className="filter-pill">
                  Level: {filters.level.charAt(0).toUpperCase() + filters.level.slice(1)} <button onClick={() => updateFilter('level', '')}>×</button>
                </span>
              )}
              {filters.funding && (
                <span className="filter-pill">
                  Funding: {filters.funding === 'fully-funded' ? 'Fully Funded' : filters.funding.charAt(0).toUpperCase() + filters.funding.slice(1)} <button onClick={() => updateFilter('funding', '')}>×</button>
                </span>
              )}
            </div>
          )}

          <p style={{ marginTop: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem' }}>
            Showing {filtered.length} of {scholarships.length} scholarships
          </p>

          {filtered.length > 0 ? (
            <div className="feature-grid">
              {filtered.map(s => (
                <div className="card scholarship-card" key={s.id}>
                  <div className="card-header">
                    <span className="card-country">
                      <span className="flag">{s.countryFlag}</span> {s.country}
                    </span>
                    <button
                      className={`card-bookmark ${savedIds.includes(s.id) ? 'saved' : ''}`}
                      onClick={() => toggleSave(s.id)}
                      aria-label={savedIds.includes(s.id) ? 'Unsave' : 'Save'}
                    >
                      {savedIds.includes(s.id) ? '♥' : '♡'}
                    </button>
                  </div>
                  <h3>{s.name}</h3>
                  <p className="card-organizer">{s.organizer}</p>
                  <div className="card-badges">
                    {s.level.map(l => <span key={l} className="badge badge-level">{l}</span>)}
                    <span className={`badge badge-funding ${s.fundingType === 'fully-funded' ? 'fully-funded' : ''}`}>
                      {s.fundingType === 'fully-funded' ? 'Fully Funded' : s.fundingType === 'partial' ? 'Partial Funding' : 'Stipend'}
                    </span>
                  </div>
                  <ul className="card-covers">
                    {s.covers.map(c => <li key={c}>{c}</li>)}
                  </ul>
                  {(() => {
                    const daysLeft = Math.ceil((new Date(s.deadlineDate) - new Date()) / (1000*60*60*24));
                    const isUrgent = daysLeft > 0 && daysLeft < 30;
                    return (
                      <span className={`card-deadline ${isUrgent ? 'urgent' : ''}`}>
                        📅 {s.deadline} {daysLeft > 0 ? `(${daysLeft} days left)` : ''}
                      </span>
                    );
                  })()}
                  <ul className="card-eligibility">
                    {s.eligibility.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                  <div className="card-actions">
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                      Apply Now →
                    </a>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn-outline btn-sm">
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-500)' }}>No scholarships match your search</p>
              <button
                className="btn-primary btn-sm"
                onClick={() => {
                  setSearch('');
                  clearAllFilters();
                  setShowSaved(false);
                }}
                style={{ marginTop: '1rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}

          <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--gray-100)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.8125rem', marginBottom: 0 }}>
              <strong>Disclaimer:</strong> Deadlines shown are for the 2026-2027 application cycle and may be approximate. Dates marked with ~ haven&apos;t been officially confirmed yet. Always verify with the official scholarship website before applying.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
