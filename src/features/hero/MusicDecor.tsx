import { useEffect, useRef } from 'react';

interface MusicDecorProps {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const NOTES = ['♪', '♫', '♬', '♩', '♭', '♮', '♯'];

export default function MusicDecor({ position = 'bottom-right' }: MusicDecorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const noteElements: HTMLSpanElement[] = [];

    // Create floating notes
    for (let i = 0; i < 8; i++) {
      const note = document.createElement('span');
      note.textContent = NOTES[i % NOTES.length];
      note.style.cssText = `
        position: absolute;
        font-size: ${12 + Math.random() * 16}px;
        color: rgba(249, 115, 22, ${0.3 + Math.random() * 0.3});
        left: ${Math.random() * 100}%;
        bottom: ${Math.random() * 100}%;
        animation: float-up ${4 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 3}s;
        opacity: 0;
        pointer-events: none;
        user-select: none;
      `;
      container.appendChild(note);
      noteElements.push(note);
    }

    return () => {
      noteElements.forEach((el) => el.remove());
    };
  }, []);

  const positionStyles: Record<string, string> = {
    'top-left': 'top: 5.5rem; left: calc((100% - 100vw) / 2 + 0.5rem);',
    'top-right': 'top: 0; right: 0;',
    'bottom-left': 'bottom: 0; left: 0;',
    'bottom-right': 'bottom: 0; right: 0;',
  };

  return (
    <>
      <style>{`
        @keyframes float-up {
          0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg) scale(0.5);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-80px) rotate(20deg) scale(1.2);
          }
        }

        .music-decor-container {
          position: absolute;
          width: 200px;
          height: 200px;
          overflow: visible;
          z-index: 1;
          pointer-events: none;
          ${positionStyles[position]}
        }

        @media (max-width: 768px) {
          .music-decor-container {
            width: 120px;
            height: 120px;
            opacity: 0.6;
          }
        }
      `}</style>
      <div ref={containerRef} className="music-decor-container" />
    </>
  );
}
