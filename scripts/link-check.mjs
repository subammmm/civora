import { LinkChecker } from 'linkinator';

const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

console.log(`\n🔍 Checking links on ${baseUrl}...\n`);

const checker = new LinkChecker();

checker.on('link', (result) => {
  if (result.state === 'BROKEN') {
    console.error(`❌ BROKEN: ${result.url} (${result.status})`);
    console.error(`   Found on: ${result.parent}`);
  } else if (result.state === 'SKIPPED') {
    // Don't log skipped links (external, mailto, tel)
  } else {
    // Log working links in verbose mode
    if (process.env.VERBOSE) {
      console.log(`✓ ${result.url} (${result.status})`);
    }
  }
});

const options = {
  path: baseUrl,
  recurse: true,
  timeout: 5000,
  linksToSkip: [
    // Skip external links (only check internal links)
    /^https?:\/\/(?!localhost|127\.0\.0\.1|civora\.me)/,
    // Skip mailto and tel links
    /^mailto:/,
    /^tel:/,
    // Skip social media shares that might be blocked
    /twitter\.com\/intent/,
    /facebook\.com\/sharer/,
    /linkedin\.com\/shareArticle/,
  ],
};

try {
  const result = await checker.check(options);
  
  // Filter broken links
  const brokenLinks = result.links.filter(
    (link) => link.state === 'BROKEN' && link.status !== 999
  );
  
  console.log(`\n📊 Summary:`);
  console.log(`   Total links checked: ${result.links.length}`);
  console.log(`   Broken links: ${brokenLinks.length}`);
  console.log(`   Passed links: ${result.passed}`);
  
  if (brokenLinks.length > 0) {
    console.error(`\n❌ Found ${brokenLinks.length} broken link(s):`);
    brokenLinks.forEach((link) => {
      console.error(`   ${link.url} (${link.status}) - found on ${link.parent}`);
    });
    process.exit(1);
  } else {
    console.log('\n✅ No broken internal links found!');
    process.exit(0);
  }
} catch (error) {
  console.error('\n❌ Error running link check:', error.message);
  process.exit(1);
}
