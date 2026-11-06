# Modellwerkstatt: ER-Modelle (Klasse 10)

Eine buildfreie, GitHub-Pages-kompatible Lernumgebung für die zweite Stunde der Reihe „Datenmodellierung und Datenbanksysteme“.

## Start und Deployment

`index.html` kann direkt im Browser geöffnet werden. Für GitHub Pages den Ordner als Repository-Root veröffentlichen; es sind weder Backend noch Build-Schritt nötig. Der Lernstand liegt ausschließlich im `localStorage` des Browsers.

## Didaktik

Abschnitt I knüpft an die Sammelkarten-Tabelle aus Stunde 1 an und führt Entitäten, Attribute, Schlüssel, Beziehungen und Kardinalitäten in Chen-Notation ein. Kurze Rückmeldungen und die verpflichtende Zwischenreflexion sichern das Verständnis. Abschnitt II lässt die Anforderungen von einer einzelnen Entität bis zum Projekttag-Szenario ansteigen. Freitext wird gespeichert, aber nicht automatisch benotet.

## Architektur

| Datei | Aufgabe |
|---|---|
| `index.html` | Lerninhalte, Aufgabenoberfläche und zugängliche Grundstruktur |
| `styles.css` | responsives Design, Karten, Editor und Feedback |
| `app.js` | UI, Graph-Editor, Persistenz, Import/Export und Interaktionen |
| `validator.js` | fachlicher, positionsunabhängiger Regelvalidator |
| `tests/validator.test.js` | automatisierte Kernprüfungen des Validators |

Das Diagramm ist JSON (`nodes`, `edges`); dadurch sind Import/Export, Undo/Redo sowie regelbasierte Prüfung unabhängig von der Darstellung möglich. Der Validator akzeptiert gängige Synonyme, prüft erforderliche Teile und Kardinalitäten und trennt positive Befunde, zu prüfende Punkte und den nächsten Lernschritt. Nicht zuverlässig prüfbare Entscheidungen werden nicht als Fehler ausgegeben.

## Erweiterungen

Neue Aufgaben werden in `app.js` (Text/Hinweise) und `validator.js` (fachliche Spezifikation) ergänzt. Weitere Synonyme gehören in `aliases` in `validator.js`.

## Test

Mit installiertem Node.js: `node tests/validator.test.js`.
