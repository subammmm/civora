'use client';



const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Scholarship Mistakes Nepali Students Make (And How to Avoid Them)',
    excerpt: "After analyzing hundreds of scholarship applications and talking to successful recipients, I've identified the most common mistakes that prevent talented Nepali students from securing funding. Here's what you need to know.",
    category: 'Featured',
    date: 'December 15, 2024',
    readingTime: '8 min read',
    tags: ['Scholarships', 'Tips', 'Application Strategy']
  },
  {
    id: 2,
    title: "2025 Scholarship Landscape: What's Changing for International Students",
    excerpt: 'Major shifts in global education policy are affecting scholarship availability and eligibility criteria. From new programs in emerging destinations to changes in traditional scholarship powerhouses.',
    category: 'Analysis',
    date: 'December 8, 2024',
    readingTime: '6 min read',
    tags: ['Global Trends', 'Policy']
  },
  {
    id: 3,
    title: 'Building Civora: Lessons from Creating a Student Resource Platform',
    excerpt: 'The technical and strategic decisions behind building Civora, from choosing a static site architecture to implementing multilingual support. A case study in mission-driven development.',
    category: 'Guide',
    date: 'November 30, 2024',
    readingTime: '10 min read',
    tags: ['Tech', 'Leadership', 'Case Study']
  },
  {
    id: 4,
    title: 'Why Europe is Becoming the Top Choice for Nepali Students',
    excerpt: "Data analysis showing the shift in student preferences from traditional English-speaking countries to European destinations. What's driving this change and what it means for future applicants.",
    category: 'Strategy',
    date: 'November 22, 2024',
    readingTime: '7 min read',
    tags: ['Europe', 'Trends', 'Data']
  },
  {
    id: 5,
    title: 'Civora Platform Updates: New Features and Improvements',
    excerpt: "Recent additions to the platform including the Pathway Builder tool, enhanced student stories section, and improved mobile experience. Plus a sneak peek at what's coming next.",
    category: 'Update',
    date: 'November 15, 2024',
    readingTime: '4 min read',
    tags: ['Platform', 'Updates']
  }
];

export default function BlogPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <h1>Blog & Updates</h1>
          <p className="page-intro">
            Insights, tips, and the latest developments in global education. Stay informed about new scholarship opportunities, policy changes, and success strategies for international students.
          </p>
        </div>
      </section>

      <section className="blog-featured section">
        <div className="container">
          {blogPosts.slice(0, 1).map(post => (
            <article key={post.id} className="blog-post featured-post card reveal">
              <div className="post-header">
                <span className="post-category">{post.category}</span>
                <time className="post-date">{post.date}</time>
              </div>
              <h2>
                <a href={`#post-${post.id}`}>{post.title}</a>
              </h2>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-meta">
                <span className="reading-time">{post.readingTime}</span>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blog-posts section">
        <div className="container">
          {blogPosts.slice(1).map(post => (
            <article key={post.id} className="blog-post card reveal">
              <div className="post-header">
                <span className="post-category">{post.category}</span>
                <time className="post-date">{post.date}</time>
              </div>
              <h3>
                <a href={`#post-${post.id}`}>{post.title}</a>
              </h3>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className="post-meta">
                <span className="reading-time">{post.readingTime}</span>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blog-sidebar-content section">
        <div className="container">
          <div className="sidebar-section card reveal">
            <h3>Subscribe to Updates</h3>
            <p>Get the latest scholarship opportunities and study abroad tips delivered to your inbox.</p>
            <form className="newsletter-form" action="https://formspree.io/f/xldpregr" method="POST">
              <input type="hidden" name="_subject" value="Newsletter Subscription" />
              <input type="email" name="email" placeholder="Your email address" required />
              <button type="submit" className="subscribe-btn">Subscribe</button>
            </form>
          </div>

          <div className="sidebar-section card reveal">
            <h3>Popular Topics</h3>
            <div className="topic-tags">
              {['KGSP', 'Eiffel Scholarship', 'Erasmus+', 'Canada Study Permit', 'SOP Writing', 'IELTS Preparation', 'Visa Applications', 'European Universities'].map(topic => (
                <a href="#" key={topic} className="topic-tag">{topic}</a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="blog-cta section">
        <div className="container">
          <div className="cta-content card reveal">
            <h2>Have a Topic Suggestion?</h2>
            <p>What would you like to read about? Suggest topics or ask questions that could become our next blog post.</p>
            <a href="/contact" className="cta-btn">Suggest a Topic</a>
          </div>
        </div>
      </section>
    </main>
  );
}
