import LegalPageLayout from '../../components/LegalPageLayout';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Civora privacy policy - How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="October 12, 2025">
      <section style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>1. Introduction</h2>
        <p>
          Welcome to Civora ("we," "our," or "us"). We are committed to protecting your personal
          information and your right to privacy. This Privacy Policy explains how we collect, use,
          disclose, and safeguard your information when you visit our website civora.me.
        </p>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
          <li>
            <strong>Personal Data:</strong> When you contact us or use our services, we may collect
            your name, email address, and any other information you choose to provide.
          </li>
          <li>
            <strong>Usage Data:</strong> We automatically collect information about how you access
            and use our website, including your IP address, browser type, pages visited, time spent
            on pages, and other diagnostic data.
          </li>
          <li>
            <strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies
            to track activity on our website and store certain information.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>3. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
          <li>To provide, maintain, and improve our services</li>
          <li>To respond to your inquiries and provide customer support</li>
          <li>To send you updates, newsletters, and marketing communications (with your consent)</li>
          <li>To monitor and analyze usage and trends to improve user experience</li>
          <li>To detect, prevent, and address technical issues and security threats</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>4. Data Sharing and Disclosure</h2>
        <p>
          We do not sell, trade, or rent your personal information to third parties. We may share
          your information in the following circumstances:
        </p>
        <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
          <li>
            <strong>Service Providers:</strong> We may share information with third-party service
            providers who perform services on our behalf (e.g., analytics, hosting, email delivery).
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information if required by law or
            in response to valid legal requests.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of
            assets, your information may be transferred.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>5. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes
          outlined in this Privacy Policy, unless a longer retention period is required or permitted
          by law.
        </p>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>6. Your Rights</h2>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
          <li>The right to access, update, or delete your information</li>
          <li>The right to rectification of inaccurate data</li>
          <li>The right to object to or restrict processing</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>
        <p style={{ marginTop: '1rem' }}>
          To exercise these rights, please contact us at the email address provided below.
        </p>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>7. Security</h2>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          personal information. However, no method of transmission over the internet or electronic
          storage is 100% secure, and we cannot guarantee absolute security.
        </p>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>8. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites. We are not responsible for the
          privacy practices or content of these external sites. We encourage you to review their
          privacy policies.
        </p>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>9. Children's Privacy</h2>
        <p>
          Our services are not directed to individuals under the age of 13. We do not knowingly
          collect personal information from children under 13. If we become aware that we have
          collected such information, we will take steps to delete it.
        </p>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          10. Changes to This Privacy Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page and updating the "Last updated" date. We
          encourage you to review this Privacy Policy periodically.
        </p>
      </section>

      <section style={{ marginBottom: '2rem', lineHeight: '1.8' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>11. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <p style={{ marginTop: '1rem' }}>
          <strong>Email:</strong> privacy@civora.me
          <br />
          <strong>Website:</strong> https://civora.me/contact/
        </p>
      </section>

      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          This privacy policy is effective as of the date stated above and applies to all users of
          civora.me. By using our website, you consent to the terms of this Privacy Policy.
        </p>
      </div>
    </LegalPageLayout>
  );
}
