# NoteNest – Notenabenteuer

Ein unabhängiger, touchfreundlicher Notenlese-Trainer für Kinder. Die Notation wird mit VexFlow 4.2.2 aus der lokalen Datei `vendor/vexflow-4.2.2.js` gezeichnet.

## Lokal starten

Öffne [index.html](./index.html) direkt in einem modernen Browser. Es ist keine Installation und kein Build-Schritt nötig.

Für einen lokalen Webserver kannst du in diesem Ordner `npx serve .` starten und danach die angezeigte Adresse öffnen.

Für die Entwicklung kann VexFlow mit `npm.cmd install` wiederhergestellt werden. Die veröffentlichte Website benötigt danach keine CDN-Verbindung.

## Veröffentlichen

Die App-Dateien samt `vendor`-Ordner können auf GitHub Pages, Netlify oder jedem statischen Webhost liegen. Als Stammordner dient dieser Ordner.

## Enthalten

- SVG-Notenzeilen im Violin- und Bassschlüssel mit zufälligen Fragen
- Übungen von Notenzeile zu Note und Klaviertaste sowie ein freies Klavier
- Klavierähnliche Töne mit Web Audio und Stummschaltung
- Responsives Klavier mit markiertem mittleren C und großen Tasten
- Elternbereich mit Einstellungen, fertigen Vorlagen, eigenen Vorlagen und Auswertung
- Sicheres Speichern des Lernstands im Browser
- Rücksicht auf reduzierte Bewegung und Tastaturbedienung
- Große, automatisch gesetzte VexFlow-Notenzeilen und ein 3-Oktaven-Klavier
- Freie Spielauswahl direkt auf der Startseite ohne Elternschutz

## Entwickler-Testseite

Öffne `index.html#/test`, um Naturtöne in beiden Schlüsseln, Kreuze, vier identische Mini-Notenzeilen und das Testklavier zu prüfen. Die wichtigsten VexFlow- und Klavierbedingungen werden beim Start zusätzlich per Selbsttest geprüft.

Alle Übungsdaten bleiben im Browser. Beim Löschen der Websitedaten werden Profil und Lernstand entfernt.

