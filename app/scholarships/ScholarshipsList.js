'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { scholarships } from './scholarships-data';
import { daysLeft, matchesDeadline } from '../../lib/deadlines';

const CALENDAR_URL = '/api/scholarships/calendar.ics';
const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// Display name per country code, taken from the data ('Various' for the multi-country entries).
const countryNames = Object.fromEntries([...scholarships].reverse().map((s) => [s.countryCode, s.country]));
const getCountryLabel = (code) => countryNames[code] || code;

const LEVELS = ['Bachelors', 'Masters', 'PhD'];
const levelLabel = (value) => LEVELS.find((l) => l.toLowerCase() === value) || '';

// initialNow: the time the page was rendered on the server, so the prerendered HTML already sorts and labels
// deadlines correctly; the clock is read again after mount.
export default function ScholarshipsList({ initialNow }) {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ country: '', level: '', field: '', funding: '' });
  const [sort, setSort] = useState('deadline');
  const [savedIds, setSavedIds] = useState([]);
  const [view, setView] = useState('all'); // all | open | soon | saved
  const [now, setNow] = useState(initialNow);

  useEffect(() => {
    // Deliberate post-mount read of the clock/URL/localStorage (not available while prerendering).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setSearch(q);
    const level = params.get('level');
    if (levelLabel(level)) setFilters((prev) => ({ ...prev, level }));
    if (params.get('deadline') === '30d') setView('soon');
    if (params.get('deadline') === 'open') setView('open');
    try {
      // Drop ids of entries that have since been removed from the list.
      const saved = JSON.parse(localStorage.getItem('civora-saved') || '[]');
      setSavedIds(saved.filter((id) => scholarships.some((s) => s.id === id)));
    } catch {}
  }, []);

  // Keep the address bar shareable: ?q=, ?level= and ?deadline= mirror the search box, level filter and tab.
  // Declared after the effect above, so on first load the query string has been read before this rewrites it.
  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('q', search);
    if (filters.level) params.set('level', filters.level);
    if (view === 'open') params.set('deadline', 'open');
    if (view === 'soon') params.set('deadline', '30d');
    const query = params.toString();
    window.history.replaceState(null, '', query ? `?${query}` : window.location.pathname);
  }, [search, filters.level, view]);

  const toggleSave = (id) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try { localStorage.setItem('civora-saved', JSON.stringify(next)); } catch {}
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

    if (view === 'saved') {
      result = result.filter(s => savedIds.includes(s.id));
    } else if (view === 'soon') {
      result = result.filter(s => matchesDeadline(s, '30d', now));
    } else if (view === 'open') {
      result = result.filter(s => matchesDeadline(s, 'open', now));
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
    if (filters.level) result = result.filter(s => s.level.some(l => l.toLowerCase() === filters.level));
    if (filters.funding) result = result.filter(s => s.fundingType === filters.funding);

    if (sort === 'deadline') {
      // Soonest upcoming first, then the ones without a single date, then the passed ones.
      const rank = (s) => !s.deadlineDate ? 1 : daysLeft(s, now) < 0 ? 2 : 0;
      result = [...result].sort((a, b) =>
        rank(a) - rank(b) || new Date(a.deadlineDate) - new Date(b.deadlineDate));
    } else {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, filters, sort, view, savedIds, now]);

  const closingSoon = scholarships.filter(s => matchesDeadline(s, '30d', now));
  const openNow = scholarships.filter(s => matchesDeadline(s, 'open', now));
  // Saved scholarships that still have a dated, upcoming deadline: the ones a calendar export can hold.
  const exportableIds = savedIds.filter(id => {
    const s = scholarships.find(x => x.id === id);
    return s && s.deadlineDate && daysLeft(s, now) >= 0;
  });

  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Scholarships</h1>
          <p className="subtext">
            Browse {scholarships.length} scholarships for Nepali students; {scholarships.filter((s) => s.lastVerified).length} were checked against official sources and say so on the card. All links go directly to official application portals.
          </p>

          <input
            className="search-input"
            type="text"
            aria-label="Search scholarships"
            placeholder="Search by name, country, or field..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%' }}
          />

          <div className="tabs" style={{ marginTop: '1rem' }}>
            <button className={`tab ${view === 'all' ? 'active' : ''}`} aria-pressed={view === 'all'} onClick={() => setView('all')}>
              All Scholarships ({scholarships.length})
            </button>
            <button className={`tab ${view === 'open' ? 'active' : ''}`} aria-pressed={view === 'open'} onClick={() => setView('open')}>
              Open now ({openNow.length})
            </button>
            <button className={`tab ${view === 'soon' ? 'active' : ''}`} aria-pressed={view === 'soon'} onClick={() => setView('soon')}>
              ⏰ Closing soon ({closingSoon.length})
            </button>
            <button className={`tab ${view === 'saved' ? 'active' : ''}`} aria-pressed={view === 'saved'} onClick={() => setView('saved')}>
              ♥ Saved ({savedIds.length})
            </button>
          </div>

          <p className="calendar-links">
            {view === 'saved' && exportableIds.length > 0 && (
              <a href={`${CALENDAR_URL}?ids=${exportableIds.join(',')}`} download>
                Export saved deadlines to calendar (.ics)
              </a>
            )}
            <a href={CALENDAR_URL}>Calendar feed of all open deadlines (.ics)</a>
            <a href="/feed.xml">Atom feed of updates</a>
          </p>

          <div className="filter-section" style={{ marginTop: '1.25rem' }}>
            <select
              className="filter-select"
              aria-label="Filter by country"
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
              aria-label="Filter by level"
              value={filters.level}
              onChange={(e) => updateFilter('level', e.target.value)}
            >
              <option value="">All Levels</option>
              {LEVELS.map(l => <option key={l} value={l.toLowerCase()}>{l}</option>)}
            </select>

            <select
              className="filter-select"
              aria-label="Filter by funding type"
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
              aria-label="Sort by"
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
                  Country: {getCountryLabel(filters.country)} <button aria-label="Remove country filter" onClick={() => updateFilter('country', '')}>×</button>
                </span>
              )}
              {filters.level && (
                <span className="filter-pill">
                  Level: {levelLabel(filters.level)} <button aria-label="Remove level filter" onClick={() => updateFilter('level', '')}>×</button>
                </span>
              )}
              {filters.funding && (
                <span className="filter-pill">
                  Funding: {filters.funding === 'fully-funded' ? 'Fully Funded' : filters.funding.charAt(0).toUpperCase() + filters.funding.slice(1)} <button aria-label="Remove funding filter" onClick={() => updateFilter('funding', '')}>×</button>
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
                      aria-label={`${savedIds.includes(s.id) ? 'Unsave' : 'Save'} ${s.name}`}
                    >
                      {savedIds.includes(s.id) ? '♥' : '♡'}
                    </button>
                  </div>
                  <h3><Link href={`/scholarships/${s.id}`} prefetch={false}>{s.name}</Link></h3>
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
                    const days = daysLeft(s, now);
                    return (
                      <span className={`card-deadline ${days !== null && days >= 0 && days <= 30 ? 'urgent' : ''}`}>
                        📅 {s.deadline} {days === null ? '' : days > 0 ? `(${days} ${days === 1 ? 'day' : 'days'} left)` : days === 0 ? '(closes today)' : '(deadline passed — check the official site for the next cycle)'}
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
                    <Link href={`/scholarships/${s.id}`} prefetch={false} className="btn-outline btn-sm" aria-label={`Details of ${s.name}`}>
                      Details
                    </Link>
                    {s.deadlineDate && daysLeft(s, now) >= 0 && (
                      <a href={`${CALENDAR_URL}?ids=${s.id}`} download className="btn-outline btn-sm" aria-label={`Add ${s.name} deadline to calendar`}>
                        📅 Add to calendar
                      </a>
                    )}
                  </div>
                  {s.lastVerified && (
                    <p className="card-verified">Verified {formatDate(s.lastVerified)}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray-500)' }}>
                {view === 'soon' ? 'No deadlines in the next 30 days match your search' : view === 'open' ? 'No open scholarships match your search' : view === 'saved' && savedIds.length === 0 ? 'No saved scholarships yet — tap ♡ on a card to save it' : 'No scholarships match your search'}
              </p>
              <button
                className="btn-primary btn-sm"
                onClick={() => {
                  setSearch('');
                  clearAllFilters();
                  setView('all');
                }}
                style={{ marginTop: '1rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}

          <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--gray-100)', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
            <p style={{ color: 'var(--gray-500)', fontSize: '0.8125rem', marginBottom: 0 }}>
              <strong>Disclaimer:</strong> Entries marked &quot;Verified&quot; were checked against the official site on that date; the others could not be fully confirmed yet. Dates marked with ~ haven&apos;t been officially confirmed yet. Always verify with the official scholarship website before applying.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
