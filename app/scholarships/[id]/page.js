import Link from 'next/link';
import { notFound } from 'next/navigation';
import { scholarships } from '../scholarships-data';
import { daysLeft } from '../../../lib/deadlines';
import { SITE_URL } from '../../../lib/site';

// "Days left" is rendered on the server: re-render daily so it does not freeze at build time.
export const revalidate = 86400;
export const dynamicParams = false;

export function generateStaticParams() {
  return scholarships.map((s) => ({ id: s.id }));
}

const find = (id) => scholarships.find((s) => s.id === id);
const fundingLabel = { 'fully-funded': 'Fully Funded', partial: 'Partial Funding', stipend: 'Stipend' };
const formatDate = (isoDate) =>
  new Date(isoDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export async function generateMetadata({ params }) {
  const s = find((await params).id);
  if (!s) return {};
  const description = `${s.name} (${s.organizer}): ${s.level.join(', ')} in ${s.country}. Deadline: ${s.deadline}.`;
  return {
    title: s.name,
    description,
    openGraph: { title: s.name, description, url: './', type: 'article', siteName: 'Civora', images: ['/assets/og-image.jpg'] },
  };
}

export default async function ScholarshipPage({ params }) {
  const s = find((await params).id);
  if (!s) notFound();

  // Server-rendered and revalidated daily, so reading the clock here is intended.
  const days = daysLeft(s, new Date().getTime());
  const pageUrl = `${SITE_URL}/scholarships/${s.id}`;

  // A scholarship is a grant, not a course, so this is a MonetaryGrant. schema.org has no deadline property
  // for grants (applicationDeadline belongs to programmes), so the deadline is stated in the description.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MonetaryGrant',
    name: s.name,
    description: `${s.description} Application deadline: ${s.deadline}.`,
    url: pageUrl,
    sameAs: s.url,
    funder: { '@type': 'Organization', name: s.organizer },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="section">
        <div className="container scholarship-detail">
          <p><Link href="/scholarships">← All scholarships</Link></p>
          <p className="card-country"><span className="flag">{s.countryFlag}</span> {s.country}</p>
          <h1>{s.name}</h1>
          <p className="subtext">{s.organizer}</p>

          <div className="card-badges">
            {s.level.map((l) => <span key={l} className="badge badge-level">{l}</span>)}
            <span className={`badge badge-funding ${s.fundingType === 'fully-funded' ? 'fully-funded' : ''}`}>
              {fundingLabel[s.fundingType]}
            </span>
            <span className="badge badge-level">{s.field}</span>
          </div>

          <p>{s.description}</p>

          <h2>Deadline</h2>
          <p>
            <span className={`card-deadline ${days !== null && days >= 0 && days <= 30 ? 'urgent' : ''}`}>
              📅 {s.deadline} {days === null ? '' : days > 0 ? `(${days} ${days === 1 ? 'day' : 'days'} left)` : days === 0 ? '(closes today)' : '(deadline passed — check the official site for the next cycle)'}
            </span>
          </p>
          {s.deadline.includes('~') && <p className="card-verified">~ marks a date the organiser has not confirmed yet.</p>}

          <h2>What it covers</h2>
          <ul className="card-covers">
            {s.covers.map((c) => <li key={c}>{c}</li>)}
          </ul>

          <h2>Eligibility</h2>
          <ul className="card-eligibility">
            {s.eligibility.map((e) => <li key={e}>{e}</li>)}
          </ul>

          <div className="card-actions">
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Official site →
            </a>
            {days !== null && days >= 0 && (
              <a href={`/api/scholarships/calendar.ics?ids=${s.id}`} download className="btn-outline">
                📅 Add to calendar
              </a>
            )}
          </div>

          <p className="card-verified">
            {s.lastVerified
              ? `Checked against the official site on ${formatDate(s.lastVerified)}.`
              : 'Not fully confirmed against the official site yet.'}
            {s.source && s.source !== s.url && <> <a href={s.source} target="_blank" rel="noopener noreferrer">Source</a>.</>}
            {' '}Always confirm the details on the official site before applying.
          </p>
        </div>
      </section>
    </main>
  );
}
