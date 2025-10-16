export default function SectionCard({ children, className = '', style = {} }) {
  return (
    <section className={`section ${className}`} style={style}>
      <div className="container">
        <div className="card reveal">
          {children}
        </div>
      </div>
    </section>
  );
}
