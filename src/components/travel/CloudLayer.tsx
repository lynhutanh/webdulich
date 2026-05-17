import React from 'react';

/**
 * CloudLayer — SVG clouds that fly across the entire page (fixed position).
 * Rendered once in TravelLayout, covers all sections.
 * pointer-events: none so it never blocks clicks.
 */

const CloudSVG = ({ opacity = 1, scale = 1 }: { opacity?: number; scale?: number }) => (
  <svg
    viewBox="0 0 400 160"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%', transform: `scale(${scale})`, transformOrigin: 'center' }}
  >
    <defs>
      <filter id="cf1" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" />
      </filter>
      <radialGradient id="cg1" cx="50%" cy="60%" r="50%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.92)" />
        <stop offset="55%"  stopColor="rgba(220,235,255,0.65)" />
        <stop offset="100%" stopColor="rgba(180,210,255,0)" />
      </radialGradient>
    </defs>
    <g opacity={opacity} filter="url(#cf1)">
      <ellipse cx="200" cy="112" rx="158" ry="44" fill="url(#cg1)" />
      <circle cx="128" cy="90"  r="52" fill="url(#cg1)" />
      <circle cx="200" cy="72"  r="62" fill="url(#cg1)" />
      <circle cx="272" cy="85"  r="50" fill="url(#cg1)" />
      <circle cx="322" cy="100" r="36" fill="url(#cg1)" />
      <circle cx="78"  cy="106" r="34" fill="url(#cg1)" />
    </g>
  </svg>
);

const WispySVG = ({ opacity = 1 }: { opacity?: number }) => (
  <svg
    viewBox="0 0 300 100"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '100%', height: '100%' }}
  >
    <defs>
      <filter id="wf1">
        <feGaussianBlur stdDeviation="4.5" />
      </filter>
      <radialGradient id="wg1" cx="50%" cy="60%" r="50%">
        <stop offset="0%"   stopColor="rgba(255,255,255,0.72)" />
        <stop offset="60%"  stopColor="rgba(200,225,255,0.38)" />
        <stop offset="100%" stopColor="rgba(180,210,255,0)" />
      </radialGradient>
    </defs>
    <g opacity={opacity} filter="url(#wf1)">
      <ellipse cx="150" cy="66" rx="128" ry="28" fill="url(#wg1)" />
      <circle cx="98"  cy="52" r="34" fill="url(#wg1)" />
      <circle cx="158" cy="42" r="40" fill="url(#wg1)" />
      <circle cx="218" cy="50" r="30" fill="url(#wg1)" />
    </g>
  </svg>
);

// Each cloud definition: size, vertical position (vh %), animation, delay
const CLOUDS = [
  // ── FAR layer — slow, small, faint ──
  { w: 420, h: 120, top:  6, anim: 'cloudFlyRight', dur: 42, delay:   0, C: WispySVG,  op: 0.40 },
  { w: 340, h: 100, top: 16, anim: 'cloudFlyLeft',  dur: 50, delay: -18, C: WispySVG,  op: 0.34 },
  { w: 280, h:  85, top: 28, anim: 'cloudFlyRight', dur: 58, delay: -34, C: WispySVG,  op: 0.30 },
  { w: 360, h: 105, top: 42, anim: 'cloudFlyLeft',  dur: 46, delay: -10, C: WispySVG,  op: 0.32 },
  { w: 300, h:  90, top: 56, anim: 'cloudFlyRight', dur: 54, delay: -26, C: WispySVG,  op: 0.28 },
  { w: 320, h:  95, top: 70, anim: 'cloudFlyLeft',  dur: 48, delay: -40, C: WispySVG,  op: 0.30 },
  { w: 260, h:  80, top: 82, anim: 'cloudFlyRight', dur: 60, delay: -14, C: WispySVG,  op: 0.26 },

  // ── MID layer — medium speed ──
  { w: 580, h: 170, top: 10, anim: 'cloudFlyRight', dur: 28, delay:  -6, C: CloudSVG,  op: 0.55 },
  { w: 480, h: 140, top: 24, anim: 'cloudFlyLeft',  dur: 32, delay: -20, C: CloudSVG,  op: 0.48 },
  { w: 420, h: 125, top: 38, anim: 'cloudFlyRight', dur: 36, delay: -12, C: WispySVG,  op: 0.44 },
  { w: 520, h: 155, top: 52, anim: 'cloudFlyLeft',  dur: 30, delay: -24, C: CloudSVG,  op: 0.50 },
  { w: 460, h: 135, top: 66, anim: 'cloudFlyRight', dur: 34, delay:  -8, C: CloudSVG,  op: 0.46 },
  { w: 400, h: 120, top: 78, anim: 'cloudFlyLeft',  dur: 38, delay: -30, C: WispySVG,  op: 0.40 },
  { w: 540, h: 160, top: 90, anim: 'cloudFlyRight', dur: 26, delay: -16, C: CloudSVG,  op: 0.52 },

  // ── NEAR layer — fast, large, most visible ──
  { w: 780, h: 230, top: 14, anim: 'cloudFlyRight', dur: 18, delay:  -4, C: CloudSVG,  op: 0.65, sc: 1.05 },
  { w: 660, h: 195, top: 32, anim: 'cloudFlyLeft',  dur: 22, delay: -14, C: CloudSVG,  op: 0.58 },
  { w: 720, h: 210, top: 50, anim: 'cloudFlyRight', dur: 20, delay:  -9, C: CloudSVG,  op: 0.62 },
  { w: 580, h: 170, top: 68, anim: 'cloudFlyLeft',  dur: 24, delay: -18, C: WispySVG,  op: 0.55 },
  { w: 700, h: 205, top: 84, anim: 'cloudFlyRight', dur: 19, delay: -22, C: CloudSVG,  op: 0.60 },
];

export default function CloudLayer() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 15,         // above page content (z-10), below navbar (z-50) & modals
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {CLOUDS.map((c, i) => {
        const Comp = c.C;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: c.w,
              height: c.h,
              top: `${c.top}vh`,
              opacity: 0,
              animation: `${c.anim} ${c.dur}s linear infinite`,
              animationDelay: `${c.delay}s`,
              willChange: 'transform, opacity',
            }}
          >
            <Comp opacity={c.op} scale={(c as { sc?: number }).sc ?? 1} />
          </div>
        );
      })}
    </div>
  );
}
