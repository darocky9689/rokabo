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
  },
  {
    slug: 'wordpress-oder-individuelle-website',
    title: 'WordPress oder Individualentwicklung: Was passt besser?',
    description:
      'WordPress oder individuelle Website: Unterschiede bei Pflege, Sicherheit, Tempo und Kosten - für die Entscheidung, die zum eigenen Bedarf passt.',
    keyword: 'WordPress oder individuelle Website',
    teaser:
      'WordPress gilt als Standard für Websites - doch das ist nicht automatisch die beste Wahl. Wann WordPress passt und wann eine individuelle Umsetzung mehr bringt.',
    datePublished: '2026-09-11',
    sections: [
      {
        paragraphs: [
          'WordPress lief lange als gesetzter Standard, zuletzt mit spürbarem Gegenwind: Aktuell laufen rund 40 % aller Websites auf WordPress, mit sinkender Tendenz seit Ende 2025. Kein Grund zur Panik für WordPress, aber ein guter Anlass, die Standardfrage neu zu stellen - nicht „was ist üblich", sondern „was passt zu meinem Betrieb". Es geht hier um die beiden Wege, die in der Praxis die meisten Entscheidungen tragen: WordPress oder eine individuelle Umsetzung. Wer nach [Page-Buildern](/ratgeber/website-baukasten-oder-website-im-abo) oder Headless-Setups sucht, landet meist ohnehin bei einer der beiden Grundlogiken - gepflegtes CMS oder schlanke Individuallösung.'
        ]
      },
      {
        heading: 'Warum WordPress so verbreitet ist',
        paragraphs: [
          'Der Vorteil liegt auf der Hand: ein Baukasten aus Themes und Plugins für fast jeden Anwendungsfall, eine große Community, und wer selbst schreiben will, kann das ohne Programmierkenntnisse. Für Betriebe mit häufig wechselnden Inhalten - Blog, Stellenanzeigen, Aktionen - ist das ein echter Vorteil.'
        ]
      },
      {
        heading: 'Die Kehrseite: was mitkommt',
        paragraphs: [
          'Jedes Plugin ist eine zusätzliche Angriffsfläche, und das lässt sich beziffern: Aktuelle Auswertungen der WordPress-Sicherheitslage zeigen, dass rund neun von zehn neu entdeckten Schwachstellen aus Plugins stammen - aus dem WordPress-Kern selbst weniger als ein Prozent. Wer zehn Plugins installiert, importiert also zehn potenzielle Einstiegspunkte, nicht zehn Funktionen.',
          'Dazu kommt die Ladezeit: Je mehr Plugins eine Seite lädt, desto langsamer wird sie, und das wirkt sich direkt aufs Geschäft aus. Eine mittlerweile einige Jahre alte, aber bis heute vielzitierte Google-Studie zeigt: Wächst die Ladezeit von einer auf drei Sekunden, steigt die Absprungwahrscheinlichkeit um 32 %. Der Zusammenhang selbst ist nicht überholt - jede Sekunde Wartezeit kostet Sichtbarkeit bei Google und Geduld beim Besucher, unabhängig davon, wie alt die Studie ist, die das erstmals belegt hat.'
        ]
      },
      {
        heading: 'Wann WordPress die richtige Wahl ist',
        paragraphs: [
          'Wer selbst regelmäßig neue Inhalte einstellen will - Blogbeiträge bei Dienstleistern, Angebote bei Handwerksbetrieben, Aktionen im Einzelhandel -, ist mit einem CMS wie WordPress meist besser bedient als mit einer starren Individuallösung. Die Pflege liegt dann im eigenen Haus, dafür braucht es auch die Bereitschaft, sich darum zu kümmern - oder eine Betreuung, die Updates und Sicherheit übernimmt.'
        ]
      },
      {
        heading: 'Wann eine individuelle Umsetzung mehr bringt',
        paragraphs: [
          'Steht die Website eher selten still - wenige, aber wichtige Änderungen, keine tägliche Redaktion -, bringt eine handgeschriebene, statische Website mehr: kein CMS, das gewartet werden muss, keine Plugin-Sicherheitslücken, und eine Ladezeit, die von Haus aus niedrig bleibt, weil nichts geladen wird, was nicht gebraucht wird. Der Preis dafür: Änderungen laufen nicht mehr selbst, sondern über die Betreuung.'
        ]
      },
      {
        heading: 'So handhabt es rokabo',
        paragraphs: [
          'Die Wahl fällt nach dem Fall, nicht nach Vorliebe: WordPress, wenn selbst gepflegt werden soll; eine individuelle Umsetzung, wenn Tempo, Sicherheit und Ladezeit wichtiger sind als die eigene Redaktion.',
          'Am freien Markt schlägt sich diese Entscheidung meist im Preis nieder - Premium-Plugins, Sicherheits-Updates oder ein separater Wartungsvertrag bei WordPress, ein höherer Umsetzungsaufwand bei individuellen Projekten. Bei rokabo nicht: Der Preis richtet sich nach Umfang und Betreuungsaufwand, nicht nach der eingesetzten Technik. Beide Wege laufen im gleichen Paket, als [Website im Abo](/preise) mit Hosting, Updates und Betreuung inklusive - erfahrungsgemäß der Punkt, an dem sich die Entscheidung im [Erstgespräch](/kontakt) spürbar entspannt: Es geht ums Ergebnis, nicht um die Verteidigung eines Budgets.'
        ]
      },
      {
        heading: 'Fazit',
        paragraphs: [
          'Es gibt keine grundsätzlich richtige Antwort, nur eine, die zur eigenen Pflegehäufigkeit passt. Als Erfahrungswert von rokabo, keine feste Regel: Wer öfter als einmal im Monat selbst etwas ändern will oder auf viele kleine, spontane Anpassungen angewiesen ist, ist mit WordPress meist besser bedient. Wer seltener, aber dafür gezielt und planbar ändern lässt, gewinnt mit einer individuellen Umsetzung mehr an Sicherheit und Tempo, als er an Selbstständigkeit verliert.',
          'Am Ende zählt weniger, welche Technik im Hintergrund läuft, als wie oft jemand tatsächlich Hand anlegen will - und wer diese Frage vorher beantwortet, verhandelt beim Website-Projekt nicht über Technik, sondern über den eigenen Alltag.'
        ]
      }
    ]
  }
];
