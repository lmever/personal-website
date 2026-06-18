import { useEffect, useRef, useState } from 'react';

// Types
interface OrbitingLogo {
  id: number;
  name: string;
  radius: number;
  speed: number;
  delay: number;
  orbitY: number;
  size: number;
}

interface IdentityTag {
  label: string;
  href: string;
}

// Configuration - Planet-like orbits (top-down view)
const ORBITING_LOGOS: OrbitingLogo[] = [
  { id: 1, name: 'chrome', radius: 110, speed: 0.3, delay: 0, orbitY: 0, size: 42 },
  { id: 2, name: 'edge', radius: 140, speed: 0.22, delay: 2, orbitY: 0, size: 40 },
  { id: 3, name: 'chery', radius: 170, speed: 0.15, delay: 4, orbitY: 0, size: 44 },
];

const IDENTITY_TAGS: IdentityTag[] = [
  { label: 'Research Consultant', href: '#code' },
  { label: 'Independent AI Developer', href: '#code' },
  { label: 'Tech Support', href: '#code' },
  { label: 'Music Critic', href: '#influencer' },
  { label: 'Poet', href: '#influencer' },
  { label: 'Trader', href: '#code' },
];

// 钢琴配色主题 - Piano Inspired Colors
const PRIMARY_BLUE = '#3b82f6';
const SECONDARY_GREEN = '#10b981';
const GOLD_ACCENT = '#c9a962';
const DARK_TEXT = '#1a1a1a';

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Character reveal animation
  useEffect(() => {
    if (reducedMotion) {
      setRevealComplete(true);
      return;
    }

    const timer = setTimeout(() => setRevealComplete(true), 2500);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Mouse parallax effect
  useEffect(() => {
    if (reducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);

      const rotateY = percentX * 12;
      const rotateX = -percentY * 8;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [reducedMotion]);

  // Orbit animation - Top-down view (circular orbits parallel to page)
  useEffect(() => {
    if (reducedMotion) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;

      ORBITING_LOGOS.forEach((logo) => {
        const element = document.getElementById(`orbit-logo-${logo.id}`);
        if (!element) return;

        // Calculate angle for circular orbit (top-down view)
        const progress = elapsed * logo.speed + logo.delay;
        const angle = progress * (Math.PI * 2);

        // 2D circular orbit - x and y axis only (parallel to page)
        const x = Math.cos(angle) * logo.radius;
        const y = Math.sin(angle) * logo.radius;

        // Subtle size variation for slight depth effect
        const scale = 0.9 + (Math.sin(angle) + 1) * 0.05;

        element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        // Z-index based on y position for slight stacking effect
        element.style.zIndex = String(Math.floor(100 + y));
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reducedMotion]);

  // Animated text characters
  const englishName = 'lmever';

  const renderAnimatedText = (text: string, delayBase: number) => (
    <span className="inline-block">
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ease-out ${
            revealComplete || reducedMotion
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
          style={{
            transitionDelay: reducedMotion ? '0ms' : `${(delayBase + index) * 80}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  );

  return (
    <section id="home" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-container">
        {/* Left: 3D Avatar Card - Piano White Theme */}
        <div className="avatar-column">
          <div
            ref={cardRef}
            className="avatar-card"
            style={{
              transition: reducedMotion ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            {/* Glow effect behind - Blue to Green */}
            <div className="avatar-glow" aria-hidden="true" />

            {/* Avatar container - Solar system style */}
            <div className="avatar-wrapper">
              {/* Sound wave rings - Music visualizer effect */}
              <div className="sound-wave-ring" aria-hidden="true" />
              <div className="sound-wave-ring" aria-hidden="true" />
              <div className="sound-wave-ring" aria-hidden="true" />

              {/* Orbit guide rings */}
              <div className="orbit-guide-3" aria-hidden="true" />

              {/* Main avatar - The "Star" */}
              <div className="avatar-main">
                <div className="avatar-placeholder">
                  <img
                    src="/photos/portrait.jpg"
                    alt="Avatar"
                    className="avatar-image"
                  />
                </div>
              </div>

              {/* Orbiting logos - Planets around star (top-down view) */}
              {ORBITING_LOGOS.map((logo) => (
                <div
                  key={logo.id}
                  id={`orbit-logo-${logo.id}`}
                  className="orbit-logo"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginLeft: -logo.size / 2,
                    marginTop: -logo.size / 2,
                    width: logo.size,
                    height: logo.size,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateX(0) translateY(0)`,
                    transition: reducedMotion ? 'none' : 'opacity 0.3s ease',
                  }}
                >
                  <img
                    src={
                      logo.name === 'chrome'
                        ? 'https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome.svg'
                        : logo.name === 'edge'
                        ? 'https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge.svg'
                        : '/photos/chery.svg'
                    }
                    alt={logo.name}
                    width={logo.size}
                    height={logo.size}
                    style={{ filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1))' }}
                  />
                </div>
              ))}
            </div>

            {/* Card border decoration - Gold accent */}
            <div className="card-corner card-corner-tl" aria-hidden="true" />
            <div className="card-corner card-corner-tr" aria-hidden="true" />
            <div className="card-corner card-corner-bl" aria-hidden="true" />
            <div className="card-corner card-corner-br" aria-hidden="true" />
          </div>
        </div>

        {/* Right: Identity Info */}
        <div className="identity-column">
          <div className="identity-content">
            <p className="eyebrow-text">Welcome to my space</p>

            <h1 id="hero-title" className="hero-title">
              <span className="name-english">
                {renderAnimatedText(englishName, 0)}
              </span>
            </h1>

            <p className="hero-description">
              I always listen, touched by others' stories. Now, I wish to share
              mine with you.
            </p>

            {/* Identity tags */}
            <div className="identity-tags">
              {IDENTITY_TAGS.map((tag, index) => (
                <a
                  key={index}
                  href={tag.href}
                  className={`identity-tag transition-all duration-300 ease-out ${
                    revealComplete || reducedMotion
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    transitionDelay: reducedMotion ? '0ms' : `${1200 + index * 60}ms`,
                  }}
                >
                  {tag.label}
                </a>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="hero-actions">
              <a href="#code" className="btn btn-primary">
                View Projects
              </a>
              <a href="#influencer" className="btn btn-secondary">
                About Me
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          /* Account for fixed header height */
          padding-top: 8rem;
          padding-bottom: 4rem;
          position: relative;
        }

        .hero-container {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          align-items: center;
          width: 100%;
        }

        .avatar-column {
          flex-shrink: 0;
          display: flex;
          justify-content: center;
        }

        .identity-column {
          flex: 1;
          max-width: 600px;
          text-align: center;
        }

        .avatar-card {
          position: relative;
          width: 420px;
          height: 420px;
          border-radius: 24px;
          /* 纯白卡片 - 钢琴琴键白质感 */
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow:
            0 25px 50px -12px rgba(0, 0, 0, 0.1),
            inset 1px 1px 0 rgba(255, 255, 255, 0.9),
            inset -1px -1px 0 rgba(201, 169, 98, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: visible;
        }

        .avatar-glow {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          /* 蓝绿双色光晕 - Piano inspired */
          background: radial-gradient(circle, ${PRIMARY_BLUE}30 0%, ${SECONDARY_GREEN}20 50%, transparent 70%);
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .avatar-wrapper {
          position: relative;
          width: 160px;
          height: 160px;
        }

        .avatar-main {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
        }

        /* Orbit path visual guides - subtle rings (light theme) */
        .avatar-wrapper::before,
        .avatar-wrapper::after,
        .orbit-guide-3 {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px dashed rgba(59, 130, 246, 0.15);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .avatar-wrapper::before {
          width: 220px;
          height: 220px;
        }

        .avatar-wrapper::after {
          width: 280px;
          height: 280px;
        }

        .orbit-guide-3 {
          width: 340px;
          height: 340px;
          position: absolute;
          z-index: 0;
        }

        .avatar-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          /* 钢琴蓝绿渐变边框 */
          background: linear-gradient(135deg, ${PRIMARY_BLUE}, ${SECONDARY_GREEN});
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 30px ${PRIMARY_BLUE}40,
            0 0 60px ${SECONDARY_GREEN}30,
            inset 0 2px 10px rgba(255, 255, 255, 0.5);
          overflow: hidden;
          padding: 3px;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .orbit-logo {
          pointer-events: none;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .card-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          /* 金色角落装饰 - 钢琴铜金 */
          border-color: ${GOLD_ACCENT};
          opacity: 0.6;
        }

        .card-corner-tl {
          top: 16px;
          left: 16px;
          border-top: 2px solid;
          border-left: 2px solid;
        }

        .card-corner-tr {
          top: 16px;
          right: 16px;
          border-top: 2px solid;
          border-right: 2px solid;
        }

        .card-corner-bl {
          bottom: 16px;
          left: 16px;
          border-bottom: 2px solid;
          border-left: 2px solid;
        }

        .card-corner-br {
          bottom: 16px;
          right: 16px;
          border-bottom: 2px solid;
          border-right: 2px solid;
        }

        .identity-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .eyebrow-text {
          /* 金色引导文字 */
          color: ${GOLD_ACCENT};
          font-family: var(--font-mono, 'SF Mono', monospace);
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin: 0;
        }

        .hero-title {
          margin: 0;
          line-height: 1;
        }

        .name-english {
          font-size: clamp(3.5rem, 10vw, 6rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          /* 钢琴渐变文字 - 黑 -> 蓝 -> 绿 */
          background: linear-gradient(135deg, ${DARK_TEXT} 0%, ${PRIMARY_BLUE} 50%, ${SECONDARY_GREEN} 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.125rem;
          line-height: 1.7;
          /* 深灰正文 */
          color: var(--color-text-body, #4b5563);
          margin: 0;
        }

        .identity-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
          margin-top: 0.5rem;
        }

        .identity-tag {
          padding: 0.5rem 1rem;
          border-radius: 9999px;
          /* 浅灰背景标签 */
          background: var(--color-section-bg, #f0f2f5);
          border: 1px solid var(--color-border, rgba(229, 231, 235, 0.8));
          color: var(--color-text-body, #4b5563);
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .identity-tag:hover {
          /* 悬停时蓝色背景 */
          background: rgba(59, 130, 246, 0.1);
          border-color: ${PRIMARY_BLUE}40;
          color: ${PRIMARY_BLUE};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .btn {
          padding: 0.875rem 1.75rem;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.25s ease;
          font-size: 0.95rem;
        }

        .btn-primary {
          /* 蓝色主按钮 */
          background: linear-gradient(135deg, ${PRIMARY_BLUE}, ${SECONDARY_GREEN});
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 25px rgba(59, 130, 246, 0.4),
            0 4px 10px rgba(16, 185, 129, 0.2);
        }

        .btn-secondary {
          /* 浅灰次要按钮 */
          background: var(--color-surface, #ffffff);
          border: 1px solid var(--color-border, rgba(229, 231, 235, 0.8));
          color: var(--color-text-body, #4b5563);
        }

        .btn-secondary:hover {
          background: var(--color-bg-soft, #fafafa);
          border-color: ${PRIMARY_BLUE}40;
          color: ${PRIMARY_BLUE};
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes sound-wave {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }

        /* Sound wave rings - start from orbit guide positions (light theme) */
        .sound-wave-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          /* 蓝色声波环 */
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          animation: sound-wave 4s ease-out infinite;
          z-index: 0;
        }

        /* First ring starts at innermost orbit (220px) */
        .sound-wave-ring:nth-child(1) {
          width: 220px;
          height: 220px;
          animation-delay: 0s;
        }

        /* Second ring starts at middle orbit (280px) */
        .sound-wave-ring:nth-child(2) {
          width: 280px;
          height: 280px;
          animation-delay: 1.33s;
        }

        /* Third ring starts at outermost orbit (340px) */
        .sound-wave-ring:nth-child(3) {
          width: 340px;
          height: 340px;
          animation-delay: 2.66s;
        }

        /* Desktop layout */
        @media (min-width: 960px) {
          .hero-container {
            flex-direction: row;
            gap: 4rem;
            align-items: center;
            justify-content: center;
          }

          .identity-column {
            text-align: left;
          }

          .identity-tags {
            justify-content: flex-start;
          }

          .hero-actions {
            justify-content: flex-start;
          }

          .avatar-card {
            width: 480px;
            height: 480px;
          }

          .avatar-wrapper {
            width: 200px;
            height: 200px;
          }

          .avatar-placeholder {
            width: 150px;
            height: 150px;
          }
        }

        /* Mobile adjustments */
        @media (max-width: 640px) {
          .hero-section {
            padding: 2rem 0;
          }

          .avatar-card {
            width: 360px;
            height: 360px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .btn {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
