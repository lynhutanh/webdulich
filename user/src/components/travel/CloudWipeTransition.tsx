import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * CloudWipeTransition
 *
 * - Each section scrolls normally inside its own container (overflow-y: auto)
 * - When user reaches the BOTTOM of a section → next section
 * - When user reaches the TOP of a section → previous section
 * - Transition: soft cloud fog fades in from center, then fades out (no big scale)
 */

type Phase = 'idle' | 'fog-in' | 'fog-out';

interface Props {
  sections: React.ReactNode[];
}

export default function CloudWipeTransition({ sections }: Props) {
  const [current, setCurrent]     = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [phase, setPhase]         = useState<Phase>('idle');
  const busyRef    = useRef(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const total = sections.length;

  const goTo = useCallback((next: number) => {
    if (busyRef.current) return;
    if (next < 0 || next >= total) return;
    if (next === current) return;

    busyRef.current = true;
    setPhase('fog-in');

    // After fog covers screen → swap content
    setTimeout(() => {
      setDisplayed(next);
      setCurrent(next);
      // Scroll new section to top
      if (sectionRef.current) sectionRef.current.scrollTop = 0;
      setPhase('fog-out');

      // After fog clears
      setTimeout(() => {
        setPhase('idle');
        busyRef.current = false;
      }, 700);
    }, 500);
  }, [current, total]);

  // Wheel: only trigger section change when at boundary
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let wheelAccum = 0;
    let lastWheelTime = 0;

    const onWheel = (e: WheelEvent) => {
      if (busyRef.current) { e.preventDefault(); return; }

      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      const atTop    = el.scrollTop <= 4;

      const goingDown = e.deltaY > 0;
      const goingUp   = e.deltaY < 0;

      // If not at boundary, let normal scroll happen
      if (goingDown && !atBottom) return;
      if (goingUp  && !atTop)    return;

      // At boundary — accumulate to avoid accidental triggers
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTime > 600) wheelAccum = 0;
      lastWheelTime = now;
      wheelAccum += Math.abs(e.deltaY);

      if (wheelAccum > 80) {
        wheelAccum = 0;
        if (goingDown) goTo(current + 1);
        else           goTo(current - 1);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [current, goTo]);

  // Touch swipe: only at boundary
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let startY = 0;
    let startScrollTop = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startScrollTop = el.scrollTop;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (busyRef.current) return;
      const diff = startY - e.changedTouches[0].clientY;
      const scrolled = el.scrollTop - startScrollTop;

      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      const atTop    = el.scrollTop <= 4;

      // Only switch if swipe direction matches boundary
      if (diff > 60 && atBottom)  goTo(current + 1);
      if (diff < -60 && atTop)    goTo(current - 1);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend',   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend',   onTouchEnd);
    };
  }, [current, goTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
      const atTop    = el.scrollTop <= 4;

      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && atBottom) {
        e.preventDefault(); goTo(current + 1);
      }
      if ((e.key === 'ArrowUp' || e.key === 'PageUp') && atTop) {
        e.preventDefault(); goTo(current - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goTo]);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>

      {/* Scrollable section container */}
      <div
        ref={sectionRef}
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
          // Smooth scroll within section
          scrollBehavior: 'smooth',
        }}
      >
        {sections[displayed]}
      </div>

      {/* Dot nav */}
      <div style={{
        position: 'fixed', right: 20, top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40, display: 'flex', flexDirection: 'column', gap: 10,
        pointerEvents: 'auto',
      }}>
        {sections.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Section ${i + 1}`}
            style={{
              width: i === current ? 10 : 7,
              height: i === current ? 10 : 7,
              borderRadius: '50%',
              background: i === current ? '#22d3ee' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: i === current ? '0 0 8px rgba(34,211,238,0.9)' : 'none',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Cloud fog overlay — soft mist, no big scale */}
      {phase !== 'idle' && (
        <div
          style={{
            position: 'fixed', inset: 0,
            zIndex: 9998,
            pointerEvents: 'none',
            // Fog: radial white/blue mist fading in/out
            background: 'radial-gradient(ellipse 120% 120% at 50% 50%, rgba(200,225,255,0.55) 0%, rgba(180,210,255,0.35) 35%, rgba(140,190,255,0.15) 65%, transparent 100%)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            opacity: phase === 'fog-in' ? 0 : 0,
            animation: phase === 'fog-in'
              ? 'fogIn 0.5s ease-out forwards'
              : 'fogOut 0.7s ease-in forwards',
          }}
        />
      )}
    </div>
  );
}
