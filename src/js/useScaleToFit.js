// src/hooks/useScaleToFit.js
import * as React from "react";

/** Scale inner so it always fits outer; locks measured size to avoid reflow loops. */
export default function useScaleToFit(
  outerRef,
  innerRef,
  { minScale = 0.6 } = {}
) {
  const measureAndScale = React.useCallback(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // Reset to natural size
    inner.style.setProperty("--fit-scale", 1);
    inner.style.width = "auto";
    inner.style.height = "auto";

    // Measure natural size
    const iw = inner.scrollWidth;
    const ih = inner.scrollHeight;
    const ow = outer.clientWidth;
    const oh = outer.clientHeight;

    if (!iw || !ih || !ow || !oh) return;

    // Lock the natural size to avoid oscillations
    inner.style.width = iw + "px";
    inner.style.height = ih + "px";

    // Compute scale
    const scale = Math.max(minScale, Math.min(1, ow / iw, oh / ih));
    inner.style.setProperty("--fit-scale", String(scale));
  }, [outerRef, innerRef, minScale]);

  React.useLayoutEffect(() => {
    if (!outerRef.current || !innerRef.current) return;

    const ro = new ResizeObserver(measureAndScale);
    ro.observe(outerRef.current);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAndScale).catch(() => {});
    }

    const imgs = Array.from(innerRef.current.querySelectorAll("img"));
    Promise.allSettled(
      imgs.map((img) => img.decode?.() ?? Promise.resolve())
    ).then(measureAndScale);

    window.addEventListener("resize", measureAndScale);
    measureAndScale();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureAndScale);
    };
  }, [measureAndScale, outerRef, innerRef]);
}
