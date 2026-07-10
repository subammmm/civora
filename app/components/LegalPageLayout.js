export default function LegalPageLayout({ title, lastUpdated, children }) {
  return (
    <main>
      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <div className="card">
            <h1>{title}</h1>
            <p className="subtext" style={{ marginBottom: '2rem' }}>
              Last updated: {lastUpdated}
            </p>
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
