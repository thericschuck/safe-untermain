/**
 * JSON-LD-Ausgabe nach der Next-16-Empfehlung (`docs/01-app/02-guides/json-ld.md`):
 * `dangerouslySetInnerHTML` statt Text-Children.
 *
 * Warum nicht `<script>{JSON.stringify(x)}</script>`: React escapt Text-Children
 * HTML-seitig (`&`, `<`, `>` werden zu Entities). Google parst den Script-Inhalt
 * aber als rohes JSON — ein escaptes `&amp;` in einem Feldwert macht das Snippet
 * ungültig oder verfälscht den Text. `<` neutralisiert zusätzlich das
 * `</script>`-Ausbruchsrisiko bei aus Daten stammenden Strings.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
