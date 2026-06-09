const items = [
  "20+ Jahre THW",
  "Krav Maga zertifiziert",
  "Peer / SbE",
  "B2B & B2C",
];

export default function TrustBar() {
  return (
    <div className="bg-white/88 backdrop-blur-sm border-y border-white/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-3 text-sm font-medium text-ink/60"
            >
              {i > 0 && (
                <span className="hidden sm:inline w-px h-3 bg-rot/30" />
              )}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
