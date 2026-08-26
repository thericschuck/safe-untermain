"use client";

import { useEffect, useRef } from "react";

/**
 * Sternenfeld in den Schuck-Webdesign-Unternehmensfarben (Violett #7F77DD auf #080808)
 * — dasselbe Motiv wie im Hero von schuck-webdesign.de, nur ohne Maus-Interaktion:
 * die Flaeche ist hier ein Partner-Panel, kein Hero, und liegt weit unter dem Fold.
 *
 * Laeuft nur, solange das Panel sichtbar ist (IntersectionObserver), und gar nicht bei
 * `prefers-reduced-motion` — dann wird ein einzelnes statisches Bild gezeichnet.
 */

const DICHTE = 5200; // ein Stern je N Pixel Flaeche
const VERBINDUNG = 86; // Hoechstabstand fuer Konstellationslinien

interface Stern {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  stufe: 0 | 1 | 2; // 0 = klein/dunkel  1 = mittel  2 = heller Akzent
  phase: number;
  phasenTempo: number;
  basisAlpha: number;
}

export function SternenFeld() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sanft = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animId = 0;
    let frame = 0;
    let laeuft = false;
    let sterne: Stern[] = [];
    let W = 0;
    let H = 0;

    function init() {
      const anzahl = Math.floor((W * H) / DICHTE);
      sterne = Array.from({ length: anzahl }, () => {
        const rand = Math.random();
        const stufe: 0 | 1 | 2 = rand < 0.68 ? 0 : rand < 0.95 ? 1 : 2;

        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          r:
            stufe === 0
              ? Math.random() * 0.8 + 0.25
              : stufe === 1
                ? Math.random() * 1.0 + 1.1
                : Math.random() * 1.3 + 2.0,
          stufe,
          phase: Math.random() * Math.PI * 2,
          phasenTempo:
            stufe === 2
              ? Math.random() * 0.018 + 0.01
              : stufe === 1
                ? Math.random() * 0.01 + 0.004
                : Math.random() * 0.004 + 0.001,
          basisAlpha:
            stufe === 0
              ? Math.random() * 0.2 + 0.18
              : stufe === 1
                ? Math.random() * 0.25 + 0.4
                : Math.random() * 0.15 + 0.75,
        };
      });
    }

    function schimmer(x: number, y: number, r: number, alpha: number) {
      const grd = ctx!.createRadialGradient(x, y, 0, x, y, r * 5);
      grd.addColorStop(0, `rgba(180,174,255,${alpha * 0.5})`);
      grd.addColorStop(0.35, `rgba(140,134,230,${alpha * 0.18})`);
      grd.addColorStop(1, "rgba(127,119,221,0)");
      ctx!.fillStyle = grd;
      ctx!.beginPath();
      ctx!.arc(x, y, r * 5, 0, Math.PI * 2);
      ctx!.fill();
    }

    function zeichne() {
      ctx!.clearRect(0, 0, W, H);

      // Schimmer der hellen Sterne zuerst — liegt hinter allem anderen
      for (const s of sterne) {
        if (s.stufe !== 2) continue;
        const alpha = s.basisAlpha + Math.sin(frame * s.phasenTempo + s.phase) * 0.18;
        schimmer(s.x, s.y, s.r, alpha);
      }

      for (const s of sterne) {
        if (!sanft) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < 0) s.x = W;
          else if (s.x > W) s.x = 0;
          if (s.y < 0) s.y = H;
          else if (s.y > H) s.y = 0;
        }

        const funkeln = Math.sin(frame * s.phasenTempo + s.phase);
        const alpha = Math.max(
          0.05,
          s.basisAlpha + funkeln * (s.stufe === 2 ? 0.2 : s.stufe === 1 ? 0.1 : 0.05),
        );

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle =
          s.stufe === 2
            ? `rgba(220,218,255,${alpha})`
            : s.stufe === 1
              ? `rgba(160,154,235,${alpha})`
              : `rgba(127,119,221,${alpha})`;
        ctx!.fill();

        if (s.stufe === 2) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 0.4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${alpha * 0.6})`;
          ctx!.fill();
        }
      }

      // Konstellationslinien zwischen nahen Sternen
      ctx!.lineWidth = 0.55;
      for (let i = 0; i < sterne.length; i++) {
        for (let j = i + 1; j < sterne.length; j++) {
          const dx = sterne[i].x - sterne[j].x;
          const dy = sterne[i].y - sterne[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq >= VERBINDUNG * VERBINDUNG) continue;
          const alpha = (1 - Math.sqrt(distSq) / VERBINDUNG) * 0.22;
          ctx!.strokeStyle = `rgba(147,140,235,${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(sterne[i].x, sterne[i].y);
          ctx!.lineTo(sterne[j].x, sterne[j].y);
          ctx!.stroke();
        }
      }
    }

    function tick() {
      frame++;
      zeichne();
      animId = requestAnimationFrame(tick);
    }

    function start() {
      if (laeuft || sanft || W === 0) return;
      laeuft = true;
      tick();
    }

    function stop() {
      laeuft = false;
      cancelAnimationFrame(animId);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      // Panel per `hidden lg:block` ausgeblendet — nichts zu zeichnen.
      if (w === 0 || h === 0) {
        stop();
        return;
      }
      W = w;
      H = h;
      canvas!.width = W * dpr;
      canvas!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
      zeichne();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Nur animieren, solange das Panel im Viewport steht.
    const io = new IntersectionObserver(
      ([eintrag]) => (eintrag.isIntersecting ? start() : stop()),
      { rootMargin: "200px" },
    );
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
