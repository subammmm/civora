export const metadata = {
  title: 'Privacy Policy',
  description: 'Learn about how Civora handles your data and protects your privacy.',
};

export default function PrivacyPage() {
  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Privacy Policy</h1>
      <p className="page-intro">Last updated: <span id="last-updated">October 12, 2025</span></p>
      
      <section>
        <h2>Data Collection and Use</h2>
        <p>Civora is committed to protecting your privacy. This policy explains how we collect, use, and protect your information.</p>
      </section>
      
      <section>
        <h2>Analytics</h2>
        <p>We use Google Analytics 4 to understand how visitors use our site. This helps us improve our content and user experience. Analytics data is anonymized and aggregated. You can opt out of Google Analytics tracking by using browser plugins or privacy settings.</p>
      </section>
      
      <section>
        <h2>Contact Forms</h2>
        <p>When you contact us through our forms, we collect the information you provide (name, email, message). This information is used solely to respond to your inquiry and is not shared with third parties.</p>
      </section>
      
      <section>
        <h2>Payments and Donations</h2>
        <p>If you choose to support Civora through donations, payment processing is handled by third-party providers (such as Stripe or Ko-fi). We do not store your payment information. Please refer to the payment processor&apos;s privacy policy for details on how they handle your data.</p>
      </section>
      
      <section>
        <h2>Cookies</h2>
        <p>We use essential cookies for site functionality and analytics cookies (via Google Analytics) to understand site usage. You can control cookie settings through your browser preferences.</p>
      </section>
      
      <section>
        <h2>Data Retention</h2>
        <p>Contact form submissions are retained for 2 years to provide support and follow up on inquiries. Analytics data is retained according to Google Analytics default settings (14 months for user and event data).</p>
      </section>
      
      <section>
        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Request access to your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt out of analytics tracking</li>
        </ul>
      </section>
      
      <section>
        <h2>Contact</h2>
        <p>For privacy-related questions or requests, please contact us at <a href="mailto:hello@civora.me">hello@civora.me</a>.</p>
      </section>
      
      <section>
        <h2>Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.</p>
      </section>
    </main>
  );
}
