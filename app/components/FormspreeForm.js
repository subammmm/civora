'use client';

import { useState } from 'react';

// Submits to Formspree in place and reports the outcome, instead of sending
// the visitor to an off-site error page when the form ID is missing or wrong.
// Without JS the plain action/method POST still works.
export default function FormspreeForm({ formId, successMessage, children, ...props }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const action = `https://formspree.io/f/${formId}`;

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      form.reset();
      setStatus('sent');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <>
      <form action={action} method="POST" onSubmit={onSubmit} aria-busy={status === 'sending'} {...props}>
        {children}
      </form>
      {/* outside the form so it cannot disturb the form's own (flex) layout */}
      <p role="status" style={{ margin: status === 'idle' ? 0 : '0.75rem 0 0', fontSize: '0.875rem', color: 'inherit' }}>
        {status === 'sending' && 'Sending…'}
        {status === 'sent' && successMessage}
        {status === 'error' && (
          <>
            Sorry, that could not be sent. Please email{' '}
            <a href="mailto:hello@civora.me" style={{ color: 'inherit', textDecoration: 'underline' }}>hello@civora.me</a> instead.
          </>
        )}
      </p>
    </>
  );
}
