export default function LegalPageLayout({ children, title, lastUpdated }) {
  return (
    <main style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      {title && (
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          {title}
        </h1>
      )}
      {lastUpdated && (
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Last updated: {lastUpdated}
        </p>
      )}
      <div style={{ lineHeight: '1.8' }}>
        {children}
      </div>
    </main>
  );
}
