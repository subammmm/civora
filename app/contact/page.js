export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Civora for questions, feedback, or partnership opportunities.',
}

export default function ContactPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `      
      <section className="hero">
        <div className="container">
          <h1>How Can We Help?</h1>
          <p className="subtext">Get support, share feedback, or explore partnership opportunities.</p>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-card">
              <h3>Support</h3>
              <p>Questions about scholarships, application guidance, or technical issues.</p>
              <a href="mailto:hello@civora.me" className="linear-button">Contact Support</a>
            </div>
            
            <div className="contact-card">
              <h3>Contribute</h3>
              <p>Share scholarship opportunities, help with research, or contribute content.</p>
              <a href="mailto:hello@civora.me?subject=Contribution" className="linear-button">Get Involved</a>
            </div>
            
            <div className="contact-card">
              <h3>Partnership</h3>
              <p>Organizations, universities, or educational consultants looking to collaborate.</p>
              <a href="mailto:hello@civora.me?subject=Partnership" className="linear-button">Partner With Us</a>
            </div>
            
            <div className="contact-card">
              <h3>Feedback</h3>
              <p>Suggestions for improvements, bug reports, or feature requests.</p>
              <a href="mailto:hello@civora.me?subject=Feedback" className="linear-button">Send Feedback</a>
            </div>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container">
          <div className="form-container" style="max-width: 600px; margin: 0 auto;">
            <h2 style="text-align: center; margin-bottom: var(--space-6);">Send Us a Message</h2>
            
            <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" style="display: flex; flex-direction: column; gap: var(--space-4);">
              
              <input type="text" name="_gotcha" style="display: none;" tabindex="-1" autocomplete="off">
              
              <div className="form-group">
                <label for="name" style="display: block; margin-bottom: var(--space-2); color: var(--text-primary); font-weight: 600;">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Your full name"
                  style="width: 100%; padding: var(--space-3) var(--space-4); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-input); color: var(--text-primary); font-size: var(--body-size); font-family: inherit;">
              </div>
              
              <div className="form-group">
                <label for="email" style="display: block; margin-bottom: var(--space-2); color: var(--text-primary); font-weight: 600;">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="your.email@example.com"
                  style="width: 100%; padding: var(--space-3) var(--space-4); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-input); color: var(--text-primary); font-size: var(--body-size); font-family: inherit;">
              </div>
              
              <div className="form-group">
                <label for="subject" style="display: block; margin-bottom: var(--space-2); color: var(--text-primary); font-weight: 600;">Subject</label>
                <select 
                  id="subject" 
                  name="subject"
                  style="width: 100%; padding: var(--space-3) var(--space-4); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-input); color: var(--text-primary); font-size: var(--body-size); font-family: inherit;">
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="contribution">Contribution</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              
              <div className="form-group">
                <label for="message" style="display: block; margin-bottom: var(--space-2); color: var(--text-primary); font-weight: 600;">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows="6"
                  placeholder="Tell us how we can help you..."
                  style="width: 100%; padding: var(--space-3) var(--space-4); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-input); color: var(--text-primary); font-size: var(--body-size); font-family: inherit; resize: vertical;"></textarea>
              </div>
              
              <button 
                type="submit" 
                className="linear-button" 
                style="padding: var(--space-3) var(--space-6); background: var(--accent); color: var(--text-primary); border: none; border-radius: var(--radius-input); font-size: var(--body-size); font-weight: 600; cursor: pointer; transition: background 0.3s ease;">
                Send Message
              </button>
              
              <p style="font-size: var(--small-size); color: var(--text-secondary); text-align: center; margin-top: var(--space-2);">
                * Required fields. We'll respond within 24 hours during business days.
              </p>
            </form>
          </div>
        </div>
      </section>

      
      <section className="section">
        <div className="container text-center">
          <h2>Other Ways to Reach Us</h2>
          <div className="margin-top-2">
            <p className="subtext">Email: <a href="mailto:hello@civora.me" style="color: var(--brand); text-decoration: none;">hello@civora.me</a></p>
            <p className="subtext">LinkedIn: <a href="https://linkedin.com/company/civora" target="_blank" rel="noopener" style="color: var(--brand); text-decoration: none;">linkedin.com/company/civora</a></p>
          </div>
          <div className="margin-top-2">
            <p className="subtext">We typically respond within 24 hours during business days.</p>
          </div>
        </div>
      </section>
    </main>
` }} />
  )
}
