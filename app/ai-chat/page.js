/**
 * AI Chat Page
 * 
 * This page is conditionally available based on the NEXT_PUBLIC_CIVORA_AI_ENABLED environment variable.
 * - When NEXT_PUBLIC_CIVORA_AI_ENABLED=true (Vercel): This page is accessible
 * - When NEXT_PUBLIC_CIVORA_AI_ENABLED=false (civora.me): This page shows a disabled message
 * 
 * The AI chat feature is preserved in the codebase but hidden from civora.me deployment.
 */

import AIChatInterface from "../components/AIChatInterface";

export const metadata = {
  title: "AI Assistant",
  description: "Get personalized assistance with scholarships, visas, and study abroad opportunities from Civora AI.",
};

export default function AIChatPage() {
  // Check if AI chat is enabled via environment variable
  const aiEnabled = process.env.NEXT_PUBLIC_CIVORA_AI_ENABLED === 'true';

  if (!aiEnabled) {
    // AI chat is disabled for this deployment (civora.me)
    return (
      <section className="section">
        <div className="container">
          <div className="card" style={{ textAlign: "center", padding: "3rem 2rem" }}>
            <i className="fas fa-robot" style={{ fontSize: "4rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}></i>
            <h1 style={{ marginBottom: "1rem" }}>AI Assistant Not Available</h1>
            <p className="subtext" style={{ maxWidth: "600px", margin: "0 auto 2rem" }}>
              The AI assistant feature is not available on this deployment. 
              Please use our other resources to find scholarships and guidance.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/scholarships/" className="linear-button">
                <i className="fas fa-graduation-cap icon-left" aria-hidden="true"></i>
                Browse Scholarships
              </a>
              <a href="/citizenship/" className="linear-button secondary">
                <i className="fas fa-passport icon-left" aria-hidden="true"></i>
                Citizenship Pathways
              </a>
              <a href="/contact/" className="linear-button secondary">
                <i className="fas fa-envelope icon-left" aria-hidden="true"></i>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // AI chat is enabled - show the interface (Vercel deployment)
  return (
    <section className="section">
      <div className="container">
        <AIChatInterface />
      </div>
    </section>
  );
}
