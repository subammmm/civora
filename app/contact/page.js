export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Civora for questions, feedback, or partnership opportunities.',
};

export default function ContactPage() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `      
      <section class="section">
        <div class="container text-center">
          <div class="card reveal">
            <h1>How Can We Help?</h1>
            <p class="subtext">Get support, share feedback, or explore partnership opportunities.</p>
          </div>
        </div>
      </section>

      
      <section class="section">
        <div class="container">
          <div class="feature-grid">
            <div class="card reveal">
              <h3>Support</h3>
              <p>Questions about scholarships, application guidance, or technical issues.</p>
              <a href="mailto:hello@civora.me" class="linear-button">Contact Support</a>
            </div>
            
            <div class="card reveal">
              <h3>Contribute</h3>
              <p>Share scholarship opportunities, help with research, or contribute content.</p>
              <a href="mailto:hello@civora.me?subject=Contribution" class="linear-button">Get Involved</a>
            </div>
            
            <div class="card reveal">
              <h3>Partnership</h3>
              <p>Organizations, universities, or educational consultants looking to collaborate.</p>
              <a href="mailto:hello@civora.me?subject=Partnership" class="linear-button">Partner With Us</a>
            </div>
            
            <div class="card reveal">
              <h3>Feedback</h3>
              <p>Suggestions for improvements, bug reports, or feature requests.</p>
              <a href="mailto:hello@civora.me?subject=Feedback" class="linear-button">Send Feedback</a>
            </div>
          </div>
        </div>
      </section>

      
      <section class="section">
        <div class="container">
          <div class="card reveal" style="max-width: 600px; margin: 0 auto;">
            <h2 class="text-center">Send Us a Message</h2>
            
            <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
              
              <input type="text" name="_gotcha" style="display: none;" tabindex="-1" autocomplete="off">
              
              <div class="form-group">
                <label for="name">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required 
                  placeholder="Your full name">
              </div>
              
              <div class="form-group">
                <label for="email">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required 
                  placeholder="your.email@example.com">
              </div>
              
              <div class="form-group">
                <label for="subject">Subject</label>
                <select 
                  id="subject" 
                  name="subject">
                  <option value="general">General Inquiry</option>
                  <option value="support">Support</option>
                  <option value="contribution">Contribution</option>
                  <option value="partnership">Partnership</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  required 
                  rows="6"
                  placeholder="Tell us how we can help you..."></textarea>
              </div>
              
              <button 
                type="submit" 
                class="linear-button" 
                style="width: 100%;">
                Send Message
              </button>
              
              <p class="subtext text-center">
                * Required fields. We'll respond within 24 hours during business days.
              </p>
            </form>
          </div>
        </div>
      </section>

      
      <section class="section">
        <div class="container">
          <div class="card reveal text-center">
            <h2>Other Ways to Reach Us</h2>
            <p class="subtext">Email: <a href="mailto:hello@civora.me">hello@civora.me</a></p>
            <p class="subtext">LinkedIn: <a href="https://linkedin.com/company/civora" target="_blank" rel="noopener">linkedin.com/company/civora</a></p>
            <p class="subtext">We typically respond within 24 hours during business days.</p>
          </div>
        </div>
      </section>
    </main>
`,
      }}
    />
  );
}
