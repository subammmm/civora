export const metadata = {
  title: 'Roadmap',
  description: 'Our vision and upcoming features for Civora.',
}

export default function RoadmapPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `      <h1>Roadmap & Future Plans</h1>
      <p className="page-intro">Our vision for expanding Civora into a comprehensive global mobility platform, with transparent timelines and community-driven development priorities.</p>
      
      <section className="roadmap-vision">
        <div className="vision-card">
          <h2>Our 5-Year Vision</h2>
          <p>Transform Civora from a Nepal-focused resource into the world's most trusted platform for global education and mobility. By 2029, we aim to serve students from 50+ countries with AI-powered personalization, community support, and verified pathways to education, work, and citizenship opportunities worldwide.</p>
          
          <div className="vision-metrics">
            <div className="metric-target">
              <div className="metric-number">100K+</div>
              <div className="metric-label">Students Served</div>
            </div>
            <div className="metric-target">
              <div className="metric-number">50+</div>
              <div className="metric-label">Countries Covered</div>
            </div>
            <div className="metric-target">
              <div className="metric-number">20+</div>
              <div className="metric-label">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      <section className="roadmap-timeline">
        <h2>Development Timeline</h2>
        
        <div className="timeline">
          <div className="timeline-item completed">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">Q4 2024</div>
              <h3>Foundation & Core Features</h3>
              <ul>
                <li>✅ Static website with scholarship database</li>
                <li>✅ Multilingual support (6 languages)</li>
                <li>✅ Responsive design and accessibility</li>
                <li>✅ Student stories and testimonials</li>
                <li>✅ Interactive pathway builder</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item in-progress">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">Q1 2025</div>
              <h3>Enhanced User Experience</h3>
              <ul>
                <li>🔄 User accounts and personalized dashboards</li>
                <li>🔄 Advanced scholarship filtering and search</li>
                <li>🔄 Email notifications for new opportunities</li>
                <li>🔄 Mobile app development (beta)</li>
                <li>🔄 Integration with university databases</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item planned">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">Q2 2025</div>
              <h3>AI-Powered Features</h3>
              <ul>
                <li>🔮 AI-powered scholarship matching</li>
                <li>🔮 Automated application deadline reminders</li>
                <li>🔮 Smart document review and feedback</li>
                <li>🔮 Chatbot for instant Q&A support</li>
                <li>🔮 Predictive success scoring</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item planned">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">Q3 2025</div>
              <h3>Community & Collaboration</h3>
              <ul>
                <li>🔮 Peer-to-peer mentoring platform</li>
                <li>🔮 University representative partnerships</li>
                <li>🔮 Live webinars and Q&A sessions</li>
                <li>🔮 Student ambassador program</li>
                <li>🔮 Regional meetups and events</li>
              </ul>
            </div>
          </div>

          <div className="timeline-item planned">
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <div className="timeline-date">Q4 2025</div>
              <h3>Global Expansion</h3>
              <ul>
                <li>🔮 Support for 15 additional countries</li>
                <li>🔮 Regional scholarship databases</li>
                <li>🔮 Local language content creation</li>
                <li>🔮 Country-specific visa guides</li>
                <li>🔮 Partnership with government agencies</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-priorities">
        <h2>Community-Requested Features</h2>
        <p>Features prioritized based on user feedback and voting. <a href="contact.html">Suggest new features</a> or vote on existing requests.</p>
        
        <div className="feature-list">
          <div className="feature-card high-priority">
            <div className="feature-header">
              <h3>Scholarship Deadline Calendar</h3>
              <span className="priority-badge high">High Priority</span>
            </div>
            <p>Integrated calendar showing all scholarship deadlines with personal reminders and preparation timelines.</p>
            <div className="feature-stats">
              <span className="votes">👍 342 votes</span>
              <span className="timeline">Est. Q1 2025</span>
            </div>
          </div>

          <div className="feature-card medium-priority">
            <div className="feature-header">
              <h3>Document Template Generator</h3>
              <span className="priority-badge medium">Medium Priority</span>
            </div>
            <p>AI-powered tool to generate personalized SOPs, recommendation letters, and financial documents.</p>
            <div className="feature-stats">
              <span className="votes">👍 287 votes</span>
              <span className="timeline">Est. Q2 2025</span>
            </div>
          </div>

          <div className="feature-card medium-priority">
            <div className="feature-header">
              <h3>University Comparison Tool</h3>
              <span className="priority-badge medium">Medium Priority</span>
            </div>
            <p>Side-by-side comparison of universities, programs, costs, and admission requirements.</p>
            <div className="feature-stats">
              <span className="votes">👍 245 votes</span>
              <span className="timeline">Est. Q3 2025</span>
            </div>
          </div>

          <div className="feature-card low-priority">
            <div className="feature-header">
              <h3>Cost of Living Calculator</h3>
              <span className="priority-badge low">Future</span>
            </div>
            <p>Detailed cost breakdowns for different cities and countries, with budget planning tools.</p>
            <div className="feature-stats">
              <span className="votes">👍 156 votes</span>
              <span className="timeline">Est. 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="technical-roadmap">
        <h2>Technical Evolution</h2>
        
        <div className="tech-phases">
          <div className="tech-phase">
            <h3>Phase 1: Static Foundation (Current)</h3>
            <ul>
              <li>Static HTML/CSS/JavaScript</li>
              <li>GitHub Pages hosting</li>
              <li>Formspree for form handling</li>
              <li>Manual content updates</li>
            </ul>
          </div>

          <div className="tech-phase">
            <h3>Phase 2: Dynamic Platform (2025)</h3>
            <ul>
              <li>Node.js/React application</li>
              <li>Database integration</li>
              <li>User authentication</li>
              <li>Content management system</li>
            </ul>
          </div>

          <div className="tech-phase">
            <h3>Phase 3: AI Integration (2025-2026)</h3>
            <ul>
              <li>Machine learning models</li>
              <li>Natural language processing</li>
              <li>Automated content generation</li>
              <li>Predictive analytics</li>
            </ul>
          </div>

          <div className="tech-phase">
            <h3>Phase 4: Global Scale (2026+)</h3>
            <ul>
              <li>Microservices architecture</li>
              <li>Multi-region deployment</li>
              <li>Real-time collaboration</li>
              <li>Mobile-first platform</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="community-input">
        <div className="input-card">
          <h2>Shape Our Future</h2>
          <p>Civora's development is driven by community needs. Your input helps us prioritize features and improvements that matter most to students worldwide.</p>
          
          <div className="input-options">
            <a href="contact.html?subject=Feature Request" className="input-btn">
              💡 Suggest a Feature
            </a>
            <a href="contact.html?subject=Partnership" className="input-btn">
              🤝 Propose a Partnership
            </a>
            <a href="contact.html?subject=Feedback" className="input-btn">
              📝 Share Feedback
            </a>
          </div>
          
          <div className="transparency-note">
            <p><strong>Transparency Promise:</strong> We update this roadmap quarterly and share progress reports with our community. All major decisions are made with user input and transparent communication about challenges and changes.</p>
          </div>
        </div>
      </section>

    </main>
` }} />
  )
}
