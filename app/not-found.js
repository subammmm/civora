export const metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        padding: '4rem 2rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '6rem', fontWeight: '800', margin: '0', color: '#0C0D0F' }}>404</h1>
      <h2 style={{ fontSize: '2rem', fontWeight: '600', margin: '1rem 0', color: '#333' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '1rem 0' }}>
        The page you're looking for doesn't exist or has been moved. Please check the URL or
        navigate back to our homepage.
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#0C0D0F',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'background-color 0.3s',
          }}
        >
          Go to Homepage
        </a>
        <a
          href="/scholarships/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#fff',
            color: '#0C0D0F',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            border: '2px solid #0C0D0F',
            transition: 'all 0.3s',
          }}
        >
          Browse Scholarships
        </a>
      </div>
    </main>
  );
}
