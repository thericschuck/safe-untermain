"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { toneDark, toneWarm } from "@/lib/placeholder";

const TONE = { warm: toneWarm, dark: toneDark } as const;

type FadeImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  /** Placeholder colour shown until the image is painted. */
  tone?: keyof typeof TONE;
};

/**
 * next/image that holds the image hidden until the browser has *decoded* it,
 * then crossfades it in over a flat placeholder.
 *
 * `onLoad` alone only tells us the bytes arrived — the browser can still paint a
 * partially decoded frame. Awaiting `img.decode()` means we reveal on a frame that
 * is guaranteed complete, so no half-drawn or progressively-sharpening image.
 *
 * Only for lazy/below-the-fold images: fading the LCP element would delay the
 * paint that Largest Contentful Paint is measured from.
 */
export function FadeImage({
  tone = "dark",
  className,
  onLoad,
  alt, // destructured so jsx-a11y can see it rather than losing it in the spread
  ...props
}: FadeImageProps) {
  const [shown, setShown] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>(null);

  const reveal = React.useCallback((img: HTMLImageElement) => {
    // decode() rejects if the element is detached mid-flight — harmless, still reveal
    const done = () => setShown(true);
    if (typeof img.decode === "function") {
      img.decode().then(done, done);
    } else {
      done();
    }
  }, []);

  // A cached image can already be complete before React attaches onLoad, in which
  // case the load event never fires for us and the image would stay hidden.
  React.useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) reveal(img);
  }, [reveal]);

  return (
    <>
      <span
        aria-hidden
        /* Sits before the image in DOM order, so the image paints over it without z-index */
        className="absolute inset-0 transition-opacity duration-500 ease-out motion-reduce:transition-none"
        style={{ backgroundColor: TONE[tone], opacity: shown ? 0 : 1 }}
      />
      <Image
        ref={ref}
        alt={alt}
        {...props}
        data-fade-image
        className={cn(
          "transition-opacity duration-700 ease-out motion-reduce:transition-none",
          shown ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={(e) => {
          reveal(e.currentTarget);
          onLoad?.(e);
        }}
      />
    </>
  );
}
