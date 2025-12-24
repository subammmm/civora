export const metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Civora.',
};

export default function ThankYouPage() {
  return (
    <main>
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <h1 style={{ color: 'var(--brand)', marginBottom: '1rem' }}>Thank You!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Your message has been sent successfully. We'll get back to you soon.
        </p>
        <a href="/" className="button">Return to Home</a>
      </div>
    </main>
  );
}
