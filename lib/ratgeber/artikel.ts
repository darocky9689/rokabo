export type RatgeberArtikel = {
  slug: string;
  title: string;
  description: string;
  keyword: string;
  teaser: string;
  datePublished: string;
  sections: Array<{ heading?: string; paragraphs: string[] }>;
};

export const ratgeberArtikel: RatgeberArtikel[] = [
  {
    slug: 'website-baukasten-oder-website-im-abo',
    title: 'Website-Baukasten oder Website im Abo? Der ehrliche Vergleich',
    description:
      'Baukasten oder Website im Abo: Unterschiede bei Kosten, Zeitaufwand und Pflege - ehrlich verglichen, damit du die passende Entscheidung triffst.',
    keyword: 'Website Baukasten Vergleich',
    teaser:
      'Wix, Jimdo & Co. wirken günstig und schnell. Was sie wirklich kosten - an Zeit, Aufwand und Grenzen - im ehrlichen Vergleich zur Website im Abo.',
    datePublished: '2026-09-01',
    sections: [
      {
        paragraphs: [
          'Ein Baukasten wie Wix, Jimdo oder Squarespace verspricht eine Website in einem Nachmittag - ohne Vorkenntnisse, für ein paar Euro im Monat. Das stimmt sogar. Die Frage ist nur, was danach passiert: wenn die Website online ist, wenn sie gepflegt werden muss, wenn sie bei Google gefunden werden soll. Genau da unterscheiden sich Baukasten und Website im Abo am meisten.'
        ]
      },
      {
        heading: 'Was ein Baukasten wirklich kostet',
        paragraphs: [
          'Der Einstiegspreis wirkt niedrig, oft ab 10 bis 20 € im Monat. Was in dem Preis nicht steckt: die Zeit, die du selbst investierst. Texte schreiben, Bilder zuschneiden, Menüs bauen, Vorlagen anpassen - das dauert bei den meisten Betrieben mehrere Wochenenden, nicht einen Nachmittag.',
          'Dazu kommt: Baukasten-Websites sind an die Plattform gebunden. Wechselst du den Anbieter oder kündigst du, ist die Website weg - Design, Struktur, oft auch die Verknüpfung zur Domain. Bei einer Website im Abo gehören dir Domain und Inhalte, auch wenn du das Abo irgendwann beendest.'
        ]
      },
      {
        heading: 'Wer sich um die Website kümmert',
        paragraphs: [
          'Beim Baukasten bist du selbst zuständig - für Updates, für Sicherheitslücken im verwendeten Template, für jede kleine Änderung. Bei rokabo läuft das umgekehrt: Hosting, Updates und Sicherheit sind Teil des Abos, kleine Änderungen laufen über Care Coins. Kurz Bescheid geben genügt, gemacht wird es hier.'
        ]
      },
      {
        heading: 'Sichtbarkeit bei Google',
        paragraphs: [
          'Baukästen liefern eine Grundausstattung an SEO - Seitentitel, eine Sitemap, manchmal Meta-Beschreibungen. Wie gut eine Seite tatsächlich rankt, hängt aber von Struktur, Ladezeit und Inhalt ab, und daran arbeitet niemand automatisch weiter. Im Website-Abo ist SEO je nach Paket laufend Teil der Betreuung, nicht ein einmalig gesetzter Haken.'
        ]
      },
      {
        heading: 'Wann ein Baukasten reicht',
        paragraphs: [
          'Ehrlich gesagt: für ein privates Hobbyprojekt, einen einmaligen Anlass oder zum Ausprobieren ist ein Baukasten eine vernünftige Wahl. Wer selbst gern bastelt und Zeit dafür hat, muss dafür nicht bezahlen.'
        ]
      },
      {
        heading: 'Wann sich das Abo lohnt',
        paragraphs: [
          'Sobald die Website für Kundschaft, Bewerber oder Eltern die erste Anlaufstelle ist - bei Handwerksbetrieben, Fotografinnen, Schulen und Vereinen -, zählt, dass sie aktuell bleibt, ohne dass jemand im Betrieb dafür Zeit findet. Genau dafür ist das Abo gedacht: gebaut, betreut, dauerhaft aktuell, für einen festen Monatsbeitrag statt einer hohen Einmalzahlung.'
        ]
      },
      {
        heading: 'Fazit',
        paragraphs: [
          'Ein Baukasten spart Geld und kostet Zeit. Ein Website-Abo kostet monatlich etwas mehr und nimmt dir die Zeit ab. Welcher Weg passt, hängt davon ab, wie viel eigene Zeit realistisch da ist - und was die Website leisten soll.'
        ]
      }
    ]
  }
];
