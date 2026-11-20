// The one origin used for canonical tags, the sitemap, robots.txt, the feed and structured data.
// NEXT_PUBLIC_SITE_URL wins; on Vercel the project's production host is next; civora.me is the default.
export function siteUrl(env = process.env) {
  const url =
    env.NEXT_PUBLIC_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL && `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'https://civora.me';
  return url.replace(/\/+$/, '');
}

export const SITE_URL = siteUrl();
