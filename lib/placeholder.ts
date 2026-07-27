const svg = (color: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect fill="${color}"/></svg>`

// Warm neutral — matches concrete texture, skin tones, and paper backgrounds
export const toneWarm = "#a89880"

// Dark — matches training photos and dark card backgrounds
export const toneDark = "#151412"

export const blurWarm = `data:image/svg+xml;base64,${btoa(svg(toneWarm))}`
export const blurDark = `data:image/svg+xml;base64,${btoa(svg(toneDark))}`
