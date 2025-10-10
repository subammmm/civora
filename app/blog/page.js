export const metadata = {
  title: 'Blog & Updates',
  description: 'Insights, tips, and the latest developments in global education.',
}

export default function BlogPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `      <h1>Blog & Updates</h1>
      <p className="page-intro">Insights, tips, and the latest developments in global education. Stay informed about new scholarship opportunities, policy changes, and success strategies for international students.</p>
      
      <section className="blog-featured">
        <article className="blog-post featured-post">
          <div className="post-header">
            <span className="post-category">Featured</span>
            <time className="post-date">December 15, 2024</time>
          </div>
          <h2><a href="#post-1">Top 10 Scholarship Mistakes Nepali Students Make (And How to Avoid Them)</a></h2>
          <p className="post-excerpt">After analyzing hundreds of scholarship applications and talking to successful recipients, I've identified the most common mistakes that prevent talented Nepali students from securing funding. Here's what you need to know.</p>
          <div className="post-meta">
            <span className="reading-time">8 min read</span>
            <div className="post-tags">
              <span className="tag">Scholarships</span>
              <span className="tag">Tips</span>
              <span className="tag">Application Strategy</span>
            </div>
          </div>
        </article>
      </section>

      <section className="blog-posts">
        <article className="blog-post">
          <div className="post-header">
            <span className="post-category">Analysis</span>
            <time className="post-date">December 8, 2024</time>
          </div>
          <h3><a href="#post-2">2025 Scholarship Landscape: What's Changing for International Students</a></h3>
          <p className="post-excerpt">Major shifts in global education policy are affecting scholarship availability and eligibility criteria. From new programs in emerging destinations to changes in traditional scholarship powerhouses.</p>
          <div className="post-meta">
            <span className="reading-time">6 min read</span>
            <div className="post-tags">
              <span className="tag">Global Trends</span>
              <span className="tag">Policy</span>
            </div>
          </div>
        </article>

        <article className="blog-post">
          <div className="post-header">
            <span className="post-category">Guide</span>
            <time className="post-date">November 30, 2024</time>
          </div>
          <h3><a href="#post-3">Building Civora: Lessons from Creating a Student Resource Platform</a></h3>
          <p className="post-excerpt">The technical and strategic decisions behind building Civora, from choosing a static site architecture to implementing multilingual support. A case study in mission-driven development.</p>
          <div className="post-meta">
            <span className="reading-time">10 min read</span>
            <div className="post-tags">
              <span className="tag">Tech</span>
              <span className="tag">Leadership</span>
              <span className="tag">Case Study</span>
            </div>
          </div>
        </article>

        <article className="blog-post">
          <div className="post-header">
            <span className="post-category">Strategy</span>
            <time className="post-date">November 22, 2024</time>
          </div>
          <h3><a href="#post-4">Why Europe is Becoming the Top Choice for Nepali Students</a></h3>
          <p className="post-excerpt">Data analysis showing the shift in student preferences from traditional English-speaking countries to European destinations. What's driving this change and what it means for future applicants.</p>
          <div className="post-meta">
            <span className="reading-time">7 min read</span>
            <div className="post-tags">
              <span className="tag">Europe</span>
              <span className="tag">Trends</span>
              <span className="tag">Data</span>
            </div>
          </div>
        </article>

        <article className="blog-post">
          <div className="post-header">
            <span className="post-category">Update</span>
            <time className="post-date">November 15, 2024</time>
          </div>
          <h3><a href="#post-5">Civora Platform Updates: New Features and Improvements</a></h3>
          <p className="post-excerpt">Recent additions to the platform including the Pathway Builder tool, enhanced student stories section, and improved mobile experience. Plus a sneak peek at what's coming next.</p>
          <div className="post-meta">
            <span className="reading-time">4 min read</span>
            <div className="post-tags">
              <span className="tag">Platform</span>
              <span className="tag">Updates</span>
            </div>
          </div>
        </article>
      </section>

      <section className="blog-sidebar-content">
        <div className="sidebar-section">
          <h3>Subscribe to Updates</h3>
          <p>Get the latest scholarship opportunities and study abroad tips delivered to your inbox.</p>
          <form className="newsletter-form" action="https://formspree.io/f/xldpregr" method="POST">
            <input type="hidden" name="_subject" value="Newsletter Subscription">
            <input type="email" name="email" placeholder="Your email address" required>
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
        </div>

        <div className="sidebar-section">
          <h3>Popular Topics</h3>
          <div className="topic-tags">
            <a href="#" className="topic-tag">KGSP</a>
            <a href="#" className="topic-tag">Eiffel Scholarship</a>
            <a href="#" className="topic-tag">Erasmus+</a>
            <a href="#" className="topic-tag">Canada Study Permit</a>
            <a href="#" className="topic-tag">SOP Writing</a>
            <a href="#" className="topic-tag">IELTS Preparation</a>
            <a href="#" className="topic-tag">Visa Applications</a>
            <a href="#" className="topic-tag">European Universities</a>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Recent Scholarship Alerts</h3>
          <div className="scholarship-alerts">
            <div className="alert-item">
              <span className="alert-date">Dec 10</span>
              <div className="alert-content">
                <strong>KGSP 2025</strong> applications now open
                <a href="scholarships.html" className="alert-link">View Details</a>
              </div>
            </div>
            <div className="alert-item">
              <span className="alert-date">Dec 5</span>
              <div className="alert-content">
                <strong>Eiffel Excellence</strong> deadline extended
                <a href="scholarships.html" className="alert-link">View Details</a>
              </div>
            </div>
            <div className="alert-item">
              <span className="alert-date">Nov 28</span>
              <div className="alert-content">
                <strong>New Dutch Scholarships</strong> announced
                <a href="scholarships.html" className="alert-link">View Details</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-cta">
        <div className="cta-content">
          <h2>Have a Topic Suggestion?</h2>
          <p>What would you like to read about? Suggest topics or ask questions that could become our next blog post.</p>
          <a href="contact.html" className="cta-btn">Suggest a Topic</a>
        </div>
      </section>

    </main>
` }} />
  )
}
