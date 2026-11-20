import { scholarships } from './scholarships/scholarships-data';
import { SITE_URL } from '../lib/site';

const pages = ['', '/scholarships', '/resources', '/about', '/contact', '/legal/privacy', '/legal/terms'];

export default function sitemap() {
  return [
    ...pages.map((path) => ({ url: `${SITE_URL}${path || '/'}` })),
    ...scholarships.map((s) => ({
      url: `${SITE_URL}/scholarships/${s.id}`,
      ...(s.lastVerified && { lastModified: s.lastVerified }),
    })),
  ];
}
