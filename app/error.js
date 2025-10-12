'use client';

export default function Error({ error, reset }) {
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
      <h1 style={{ fontSize: '6rem', fontWeight: '800', margin: '0', color: '#0C0D0F' }}>500</h1>
      <h2 style={{ fontSize: '2rem', fontWeight: '600', margin: '1rem 0', color: '#333' }}>
        Something Went Wrong
      </h2>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '1rem 0' }}>
        We apologize for the inconvenience. An unexpected error has occurred. Our team has been
        notified and is working to fix the issue.
      </p>
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#0C0D0F',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Try Again
        </button>
        <a
          href="/"
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
          Go to Homepage
        </a>
      </div>
      {process.env.NODE_ENV === 'development' && error && (
        <details style={{ marginTop: '2rem', maxWidth: '600px', textAlign: 'left' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '1rem' }}>
            Error Details (Development Only)
          </summary>
          <pre style={{ padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '4px', overflow: 'auto' }}>
            {error.message}
          </pre>
        </details>
      )}
    </main>
  );
}
