import type { Block } from "@/lib/leistungen";

/**
 * Rendert die einzige erlaubte Inline-Auszeichnung des Content-Moduls: `**fett**`.
 * Bewusst kein Markdown-Parser — der Content ist redaktionell gepflegt, und
 * `dangerouslySetInnerHTML` für Fließtext wäre eine unnötige XSS-Fläche.
 */
export function RichText({ children }: { children: string }) {
  return (
    <>
      {children.split(/(\*\*[^*]+\*\*)/g).map((teil, i) =>
        teil.startsWith("**") && teil.endsWith("**") ? (
          <strong key={i} className="text-ink/80 font-medium">
            {teil.slice(2, -2)}
          </strong>
        ) : (
          teil
        ),
      )}
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-[0.45em] w-1 h-1 rotate-45 bg-rot shrink-0 inline-block" />
      <span>{children}</span>
    </li>
  );
}

/**
 * Blockliste einer Leistung. `sub`-Blöcke werden als echte Überschriften
 * ausgegeben — auf der Detailseite als `h2`, im Modal der Startseite als `p`
 * (dort liegt der Kartentitel bereits auf `h3`, eine `h2` darunter würde die
 * Dokument-Gliederung umkehren).
 */
export function LeistungBlocks({
  blocks,
  subAs = "p",
}: {
  blocks: Block[];
  subAs?: "h2" | "p";
}) {
  const Sub = subAs;

  return (
    <>
      {blocks.map((block, i) => {
        if (block.typ === "text") {
          return (
            <p key={i}>
              <RichText>{block.inhalt}</RichText>
            </p>
          );
        }
        if (block.typ === "sub") {
          return (
            <Sub
              key={i}
              className={
                subAs === "h2"
                  ? "font-display text-2xl lg:text-3xl tracking-[0.08em] text-ink uppercase mt-6 first:mt-0"
                  : "font-display text-base tracking-[0.14em] text-ink uppercase mt-1"
              }
            >
              {block.inhalt}
            </Sub>
          );
        }
        return (
          <ul key={i} className="space-y-1.5">
            {block.inhalt.map((eintrag) => (
              <Bullet key={eintrag}>{eintrag}</Bullet>
            ))}
          </ul>
        );
      })}
    </>
  );
}
