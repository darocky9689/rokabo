'use client';

import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const company = String(data.get('company') || '').trim();
    const packageName = String(data.get('package') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !email || !company || !packageName || message.length < 20) {
      setError('Bitte alle Felder ausfüllen, Nachricht mindestens 20 Zeichen.');
      return;
    }

    setError('');
    setSubmitted(true);

    const subject = encodeURIComponent('Neue Anfrage über rokabo Website');
    const body = encodeURIComponent(
      `Name: ${name}\nUnternehmen: ${company}\nE-Mail: ${email}\nGewünschtes Paket: ${packageName}\n\nNachricht:\n${message}`
    );

    window.location.href = `mailto:info@rokabo.de?subject=${subject}&body=${body}`;
    form.reset();
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-input" type="text" id="name" name="name" required />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-Mail</label>
        <input className="form-input" type="email" id="email" name="email" required />
      </div>

      <div className="form-group">
        <label htmlFor="company">Unternehmen</label>
        <input className="form-input" type="text" id="company" name="company" required />
      </div>

      <div className="form-group">
        <label htmlFor="package">Gewünschtes Paket</label>
        <select className="form-select" id="package" name="package" required>
          <option value="">Bitte wählen</option>
          <option value="Light">Light</option>
          <option value="Professional">Professional</option>
          <option value="Premium">Premium</option>
          <option value="Unsicher">Ich bin noch unsicher</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Nachricht</label>
        <textarea className="form-textarea" id="message" name="message" required />
      </div>

      <button className="btn btn-primary" type="submit">Anfrage senden</button>
      {error ? <p className="error">{error}</p> : null}
      {submitted ? <p className="success-message" style={{ display: 'block' }}>Danke. Dein E-Mail-Programm öffnet sich jetzt.</p> : null}
    </form>
  );
}
