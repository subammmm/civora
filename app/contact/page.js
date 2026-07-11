export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Civora for questions, feedback, or scholarship contributions.',
};

export default function ContactPage() {
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'xldpregr';

  return (
    <main>
      {/* Hero */}
      <section className="section section-navy" style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h1>Contact Us</h1>
          <p style={{ fontSize: '1.125rem' }}>
            Have a question, feedback, or want to contribute a scholarship? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container" style={{ maxWidth: '580px' }}>
          <div className="card">
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Send Us a Message</h2>

            <form id="contact-form" action={`https://formspree.io/f/${formspreeId}`} method="POST">
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input type="text" id="name" name="name" required placeholder="Your name" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" name="email" required placeholder="you@example.com" />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select id="subject" name="subject">
                  <option value="general">General Inquiry</option>
                  <option value="scholarship">Scholarship Contribution</option>
                  <option value="feedback">Feedback</option>
                  <option value="partnership">Partnership</option>
                  <option value="newsletter">Newsletter / Deadline Reminders</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea id="message" name="message" required rows="5" placeholder="How can we help?"></textarea>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Send Message
              </button>

              <p className="subtext" style={{ textAlign: 'center', marginTop: '1rem', marginBottom: 0 }}>
                We typically respond within 48 hours.
              </p>
            </form>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ color: 'var(--gray-500)' }}>
              You can also email us directly at{' '}
              <a href="mailto:hello@civora.me" style={{ fontWeight: 600, color: 'var(--navy)' }}>hello@civora.me</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
