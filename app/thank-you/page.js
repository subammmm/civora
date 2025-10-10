export const metadata = {
  title: 'Thank You',
  description: 'Thank you for contacting Civora.',
}

export default function Thank_YouPage() {
  return (
    <div dangerouslySetInnerHTML={{ __html: `      <div style="text-align: center; padding: 3rem 0;">
        <h1 style="color: var(--brand); margin-bottom: 1rem;">Thank You!</h1>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">Your message has been sent successfully. We'll get back to you soon.</p>
        <a href="index.html" className="button">Return to Home</a>
      </div>
    </main>
` }} />
  )
}
