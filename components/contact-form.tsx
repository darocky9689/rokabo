'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useRef, useState } from 'react';

type Status = 'bereit' | 'sendet' | 'gesendet' | 'fehler';

const MAILTO = 'mailto:info@rokabo.de';
const TELEFON = 'tel:+491756240804';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('bereit');
  const [meldung, setMeldung] = useState('');
  const [fehlerFelder, setFehlerFelder] = useState<string[]>([]);
  const geladenAm = useRef(0);
  const statusRef = useRef<HTMLDivElement | null>(null);

  /* Date.now() gehoert nicht in den Render-Durchlauf - es ist unrein und
     wuerde bei jedem Rendern neu ausgewertet. Der Startzeitpunkt wird
     deshalb einmal nach dem Mounten gesetzt. */
  useEffect(() => {
    geladenAm.current = Date.now();
  }, []);

  /* Nach jeder Rueckmeldung den Fokus dorthin setzen. Ohne das erfaehrt
     niemand, der die Seite mit der Tastatur oder einem Screenreader
     bedient, ob das Absenden geklappt hat. */
  useEffect(() => {
    if (status === 'gesendet' || status === 'fehler') {
      statusRef.current?.focus();
    }
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sendet') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const pflicht: Array<[string, string]> = [
      ['name', 'Name'],
      ['email', 'E-Mail'],
      ['company', 'Betrieb oder Organisation'],
      ['package', 'Gewünschtes Paket'],
      ['bestehend', 'Bestehende Website'],
    ];

    const leer = pflicht.filter(([feld]) => String(data.get(feld) || '').trim() === '');
    const nachricht = String(data.get('message') || '').trim();

    if (leer.length > 0 || nachricht.length < 20) {
      const felder = leer.map(([feld]) => feld);
      if (nachricht.length < 20) felder.push('message');
      setFehlerFelder(felder);
      setStatus('fehler');
      setMeldung(
        leer.length > 0
          ? `Bitte ausfüllen: ${leer.map(([, label]) => label).join(', ')}.`
          : 'Bitte beschreibe dein Vorhaben in mindestens 20 Zeichen.'
      );
      return;
    }

    setFehlerFelder([]);
    setStatus('sendet');
    setMeldung('');

    data.set('vergangen', String(Math.round((Date.now() - geladenAm.current) / 1000)));

    try {
      const antwort = await fetch('/kontakt.php', { method: 'POST', body: data });
      const ergebnis = await antwort.json().catch(() => null);

      if (antwort.ok && ergebnis?.ok) {
        form.reset();
        geladenAm.current = Date.now();
        setStatus('gesendet');
        setMeldung('');
        return;
      }

      setStatus('fehler');
      setMeldung(ergebnis?.error ?? 'Das Senden hat nicht geklappt.');
    } catch {
      setStatus('fehler');
      setMeldung('Die Verbindung kam nicht zustande.');
    }
  }

  const fehlerhaft = (feld: string) => fehlerFelder.includes(feld);

  if (status === 'gesendet') {
    return (
      <div className="form-status form-status-ok" role="status" tabIndex={-1} ref={statusRef}>
        <p className="ui">Danke, die Anfrage ist angekommen.</p>
        <p>
          Du bekommst in der Regel innerhalb eines Werktags eine Antwort. Wenn es eilt,
          geht auch ein Anruf: <a href={TELEFON}>+49 175 624 0804</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          className="form-input"
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          required
          aria-invalid={fehlerhaft('name') || undefined}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">E-Mail</label>
        <input
          className="form-input"
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          required
          aria-invalid={fehlerhaft('email') || undefined}
        />
      </div>

      <div className="form-group">
        <label htmlFor="telefon">Telefon <span className="form-optional">optional</span></label>
        <input
          className="form-input"
          type="tel"
          id="telefon"
          name="telefon"
          autoComplete="tel"
          aria-describedby="telefon-hinweis"
        />
        <p className="form-hint" id="telefon-hinweis">Falls dir ein Rückruf lieber ist.</p>
      </div>

      <div className="form-group">
        <label htmlFor="company">Betrieb oder Organisation</label>
        <input
          className="form-input"
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          required
          aria-invalid={fehlerhaft('company') || undefined}
        />
      </div>

      <div className="form-group">
        <label htmlFor="package">Gewünschtes Paket</label>
        <select
          className="form-select"
          id="package"
          name="package"
          required
          aria-invalid={fehlerhaft('package') || undefined}
          defaultValue=""
        >
          <option value="">Bitte wählen</option>
          <option value="Unsicher">Ich bin noch unsicher</option>
          <option value="Starter - Single Page">Starter - Single Page</option>
          <option value="Professional">Professional</option>
          <option value="Premium">Premium</option>
          <option value="Nur E-Mail und Domain">Nur E-Mail und Domain</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="bestehend">Hast du schon eine Website?</label>
        <select
          className="form-select"
          id="bestehend"
          name="bestehend"
          required
          aria-invalid={fehlerhaft('bestehend') || undefined}
          defaultValue=""
        >
          <option value="">Bitte wählen</option>
          <option value="Nein, noch keine">Nein, noch keine</option>
          <option value="Ja, soll ersetzt werden">Ja, soll ersetzt werden</option>
          <option value="Ja, soll nur betreut werden">Ja, soll nur betreut werden</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="message">Nachricht</label>
        <textarea
          className="form-textarea"
          id="message"
          name="message"
          required
          aria-invalid={fehlerhaft('message') || undefined}
          aria-describedby="message-hinweis"
        />
        <p className="form-hint" id="message-hinweis">
          Was machst du, und was soll die Website leisten? Mindestens 20 Zeichen.
        </p>
      </div>

      {/* Honeypot: fuer Menschen unsichtbar, Bots fuellen ihn aus. */}
      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor="fax">Fax</label>
        <input type="text" id="fax" name="fax" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="btn btn-primary" type="submit" disabled={status === 'sendet'}>
        {status === 'sendet' ? 'Wird gesendet …' : 'Anfrage senden'}
      </button>

      <p className="form-hint">
        Mit dem Absenden werden deine Angaben zur Bearbeitung der Anfrage verarbeitet.
        Näheres in der <Link className="inline-link" href="/datenschutz">Datenschutzerklärung</Link>.
      </p>

      <div
        className={`form-status${status === 'fehler' ? ' form-status-fehler' : ''}`}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={statusRef}
      >
        {status === 'fehler' ? (
          <>
            <p className="ui">{meldung}</p>
            <p>
              Klappt es weiterhin nicht? Schreib direkt an{' '}
              <a href={MAILTO}>info@rokabo.de</a> oder ruf an:{' '}
              <a href={TELEFON}>+49 175 624 0804</a>.
            </p>
          </>
        ) : null}
      </div>
    </form>
  );
}
