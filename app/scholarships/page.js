import ScholarshipsList from './ScholarshipsList';

// The prerendered list is sorted and labelled by days left: re-render daily so it does not freeze at build time.
export const revalidate = 86400;

export const metadata = {
  title: 'Scholarships Database',
  description: 'Discover and compare scholarships tailored for Nepali students worldwide.',
};

export default function ScholarshipsPage() {
  // Server-rendered and revalidated daily, so reading the clock here is intended.
  const now = new Date().getTime();
  return <ScholarshipsList initialNow={now} />;
}
