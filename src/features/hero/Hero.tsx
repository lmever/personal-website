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
  { id: 1, name: 'chrome', radius: 110, speed: 0.15, delay: 0, orbitY: 0, size: 42 },
  { id: 2, name: 'edge', radius: 160, speed: 0.11, delay: 2, orbitY: 0, size: 40 },
  { id: 3, name: 'chery', radius: 210, speed: 0.075, delay: 4, orbitY: 0, size: 44 },
];

const IDENTITY_TAGS: IdentityTag[] = [
  { label: 'Research Consultant', href: '#code' },
  { label: 'Independent AI Developer', href: '#code' },
  { label: 'Tech Support', href: '#code' },
  { label: 'Music Critic', href: '#influencer' },
  { label: 'Poet', href: '#influencer' },
  { label: 'Trader', href: '#code' },
];

// 暖色星空主题 - Warm Deep-Space Colors
const GOLD_ACCENT = '#5fcf9f';

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
              {/* Aurora ring - flowing light curtains around the avatar */}
              <div className="aurora-ring aurora-ring-1" aria-hidden="true" />
              <div className="aurora-ring aurora-ring-2" aria-hidden="true" />

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

      {/* Scroll Indicator - 极细滚动指示器位于底部 40% 留白区域 */}
      <div className="scroll-indicator" aria-hidden="true" />

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          /* 天宽地窄布局 - 顶部留白 20% 视口高度，内容占据 60% */
          padding-top: 20vh;
          padding-bottom: 8rem;
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
          /* 纯轮廓卡片 - 零磨砂，仅描边，头像完全浮于星空极光之上 */
          background: transparent;
          border: 1px solid rgba(150, 215, 255, 0.28);
          box-shadow:
            inset 1px 1px 0 rgba(200, 230, 255, 0.16),
            inset -1px -1px 0 rgba(95, 207, 159, 0.12);
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
          /* 极光绿青光晕 */
          background: radial-gradient(circle, rgba(70, 210, 140, 0.35) 0%, rgba(60, 185, 175, 0.2) 50%, transparent 70%);
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

        /* 头像柔光 halo - 锚定视觉，与极光呼应 */
        .avatar-main::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 260px;
          height: 260px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(110, 224, 176, 0.35) 0%,
            rgba(77, 184, 212, 0.22) 38%,
            rgba(60, 120, 200, 0.1) 60%,
            transparent 75%);
          filter: blur(18px);
          z-index: -1;
          pointer-events: none;
          animation: pulse-glow 4s ease-in-out infinite;
        }

        /* Orbit path visual guides - subtle rings (warm theme) */
        .avatar-wrapper::before,
        .avatar-wrapper::after,
        .orbit-guide-3 {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          border: 1px dashed rgba(150, 215, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }

        .avatar-wrapper::before {
          width: 220px;
          height: 220px;
        }

        .avatar-wrapper::after {
          width: 320px;
          height: 320px;
        }

        .orbit-guide-3 {
          width: 420px;
          height: 420px;
          position: absolute;
          z-index: 0;
        }

        .avatar-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          /* 暖金渐变边框 - 烛火/落日 */
          background: linear-gradient(135deg, ${GOLD_ACCENT}, #4db8d4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 0 30px rgba(70, 210, 140, 0.45),
            0 0 60px rgba(60, 185, 175, 0.3),
            inset 0 2px 10px rgba(200, 230, 255, 0.5);
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
          /* 暖金引导文字 - 细字重形成对比张力 */
          color: #6fe0b0;
          font-family: var(--font-serif);
          font-size: 0.875rem;
          font-weight: 200;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin: 0;
        }

        .hero-title {
          margin: 0;
          line-height: 1;
        }

        .name-english {
          font-family: var(--font-serif);
          font-size: clamp(3.5rem, 10vw, 6rem);
          font-weight: 900;
          letter-spacing: -0.02em;
          /* 暖色渐变文字 - 暖白 → 金 → 暖橙 */
          background: linear-gradient(135deg, #eaf6ff 0%, #6fe0b0 50%, #4db8d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.125rem;
          font-weight: 200;
          line-height: 2.1;
          /* 暖色柔光正文 */
          color: rgba(224, 240, 255, 0.82);
          margin: 0;
        }

        /* 滚动指示器 - 极简细线 */
        .scroll-indicator {
          position: absolute;
          bottom: 12vh;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 64px;
          background: linear-gradient(to bottom, rgba(224, 240, 255, 0.6), transparent);
          opacity: 0.6;
          animation: scroll-pulse 2.5s ease-in-out infinite;
        }

        @keyframes scroll-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-50%) scaleY(0.6);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-50%) scaleY(1);
          }
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
          /* 半透明暖色玻璃标签 */
          background: rgba(200, 230, 255, 0.08);
          border: 1px solid rgba(150, 215, 255, 0.2);
          color: rgba(224, 240, 255, 0.85);
          font-size: 0.875rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .identity-tag:hover {
          /* 悬停时暖金高亮 */
          background: rgba(70, 210, 140, 0.18);
          border-color: rgba(240, 193, 120, 0.5);
          color: #eaf6ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(70, 210, 140, 0.25);
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
          /* 暖金主按钮 - 落日渐变 */
          background: linear-gradient(135deg, #4db8d4, #3a9e7e);
          color: #0a1b22;
          box-shadow: 0 4px 15px rgba(70, 210, 140, 0.35);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 8px 25px rgba(70, 210, 140, 0.45),
            0 4px 10px rgba(60, 185, 175, 0.25);
        }

        .btn-secondary {
          /* 半透明暖色玻璃次按钮 */
          background: rgba(200, 230, 255, 0.08);
          border: 1px solid rgba(150, 215, 255, 0.25);
          color: rgba(224, 240, 255, 0.9);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .btn-secondary:hover {
          background: rgba(70, 210, 140, 0.15);
          border-color: rgba(240, 193, 120, 0.5);
          color: #eaf6ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(70, 210, 140, 0.2);
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

        /* ===== Aurora ring around the avatar ===== */
        .aurora-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
          /* keep the glow as a thin ring: large transparent core, narrow colored rim */
          -webkit-mask: radial-gradient(closest-side, transparent 66%, #000 74%, #000 84%, transparent 96%);
          mask: radial-gradient(closest-side, transparent 66%, #000 74%, #000 84%, transparent 96%);
          mix-blend-mode: screen;
          filter: blur(11px) saturate(1.3);
          will-change: transform, opacity;
        }

        .aurora-ring-1 {
          background: conic-gradient(
            from 0deg,
            rgba(60, 220, 130, 0.0) 0deg,
            rgba(80, 240, 150, 0.85) 50deg,
            rgba(110, 250, 180, 0.7) 110deg,
            rgba(60, 210, 160, 0.75) 175deg,
            rgba(120, 200, 230, 0.5) 240deg,
            rgba(160, 130, 220, 0.45) 305deg,
            rgba(60, 220, 130, 0.0) 360deg
          );
          animation: aurora-spin 30s linear infinite,
            aurora-breathe 7s ease-in-out infinite alternate;
        }

        .aurora-ring-2 {
          width: 280px;
          height: 280px;
          background: conic-gradient(
            from 180deg,
            rgba(120, 255, 180, 0.0) 0deg,
            rgba(70, 230, 140, 0.7) 60deg,
            rgba(140, 250, 190, 0.6) 140deg,
            rgba(90, 200, 210, 0.55) 220deg,
            rgba(110, 240, 160, 0.8) 300deg,
            rgba(120, 255, 180, 0.0) 360deg
          );
          opacity: 0.85;
          animation: aurora-spin-rev 40s linear infinite,
            aurora-breathe 9s ease-in-out infinite alternate-reverse;
        }

        @keyframes aurora-spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes aurora-spin-rev {
          from { transform: translate(-50%, -50%) rotate(360deg); }
          to { transform: translate(-50%, -50%) rotate(0deg); }
        }

        @keyframes aurora-breathe {
          0% { filter: blur(14px) saturate(1.3); opacity: 0.7; }
          100% { filter: blur(20px) saturate(1.6); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-ring {
            animation: none;
          }
        }

        /* Sound wave rings - start from orbit guide positions (light theme) */
        .sound-wave-ring {
          position: absolute;
          left: 50%;
          top: 50%;
          /* 暖金声波环 */
          border: 1px solid rgba(70, 210, 140, 0.35);
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

        /* Second ring starts at middle orbit (320px) */
        .sound-wave-ring:nth-child(2) {
          width: 320px;
          height: 320px;
          animation-delay: 1.33s;
        }

        /* Third ring starts at outermost orbit (420px) */
        .sound-wave-ring:nth-child(3) {
          width: 420px;
          height: 420px;
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

          /* 等比缩小整组轨道，使最外圈(420px)收进 360px 卡片 */
          .avatar-wrapper {
            transform: scale(0.72);
          }

          .hero-actions {
            flex-direction: column;
          }

          .btn {
            text-align: center;
          }
        }

        /* Tablet range: card is 420px while outer orbit is also 420px,
           scale down slightly so logos don't sit on the card edge */
        @media (min-width: 641px) and (max-width: 959px) {
          .avatar-wrapper {
            transform: scale(0.9);
          }
        }
      `}</style>
    </section>
  );
}
