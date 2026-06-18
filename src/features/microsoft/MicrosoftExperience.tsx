// Types
interface TechItem {
  name: string;
  link: string;
}

interface ExperienceRole {
  id: number;
  team: string;
  description: string;
  highlights: string[];
  techStack: TechItem[];
  link: string;
}

// Microsoft Experience Data
const EXPERIENCE_DATA: ExperienceRole[] = [
  {
    id: 1,
    team: 'Microsoft Edge',
    description: 'Enterprise browser deployment & support for large-scale environments',
    highlights: [
      'Group Policy configuration & policy management',
      'Browser compatibility & performance troubleshooting',
      'Enterprise deployment & security guidance',
    ],
    techStack: [
      { name: 'Chromium', link: 'https://www.chromium.org/' },
      { name: 'WebView2', link: 'https://learn.microsoft.com/en-us/microsoft-edge/webview2/' },
      { name: 'Group Policy', link: 'https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/manage/group-policy/group-policy-overview' },
      { name: 'PowerShell', link: 'https://learn.microsoft.com/en-us/powershell/' },
      { name: 'Azure AD', link: 'https://learn.microsoft.com/en-us/entra/identity/' },
    ],
    link: 'https://learn.microsoft.com/en-us/deployedge/',
  },
  {
    id: 2,
    team: 'SCCM / WSUS',
    description: 'Endpoint configuration manager & Windows Server Update Services',
    highlights: [
      'Software distribution & application deployment',
      'WSUS sync & client compliance troubleshooting',
      'L2/L3 premier technical support for enterprises',
    ],
    techStack: [
      { name: 'SCCM/MECM', link: 'https://learn.microsoft.com/en-us/mem/configmgr/' },
      { name: 'WSUS', link: 'https://learn.microsoft.com/en-us/windows-server/administration/windows-server-update-services/get-started/windows-server-update-services-wsus' },
      { name: 'Windows Server', link: 'https://learn.microsoft.com/en-us/windows-server/' },
      { name: 'SQL Server', link: 'https://learn.microsoft.com/en-us/sql/' },
      { name: 'Intune', link: 'https://learn.microsoft.com/en-us/mem/intune/' },
    ],
    link: 'https://learn.microsoft.com/en-us/mem/configmgr/',
  },
];

// 钢琴配色 - Piano inspired colors
const PRIMARY_BLUE = '#3b82f6';
const SECONDARY_GREEN = '#10b981';

// Experience Item Component
function ExperienceItem({ role }: { role: ExperienceRole }) {
  return (
    <div className="experience-column">
      <a
        href={role.link}
        target="_blank"
        rel="noopener noreferrer"
        className="team-title"
      >
        {role.team}
      </a>

      <p className="description">{role.description}</p>

      <ul className="highlights">
        {role.highlights.map((item, idx) => (
          <li key={idx} className="highlight-item">
            <span className="bullet">▸</span>
            {item}
          </li>
        ))}
      </ul>

      <div className="tech-tags">
        {role.techStack.map((tech) => (
          <a
            key={tech.name}
            href={tech.link}
            target="_blank"
            rel="noopener noreferrer"
            className="tech-tag"
          >
            {tech.name}
          </a>
        ))}
      </div>
    </div>
  );
}

// Main Experience Section Component
export default function MicrosoftExperience() {
  return (
    <section className="microsoft-experience" aria-labelledby="microsoft-header">
      {/* Main Container Box - Light Piano Theme */}
      <div className="microsoft-container">
        {/* Logo Strip */}
        <div className="logo-strip">
          <svg
            className="microsoft-logo"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="1" width="10" height="10" fill="#f25022" />
            <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
            <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
            <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
          </svg>
          <span className="logo-text">Microsoft</span>
        </div>

        {/* Intro Text */}
        <p className="intro-text">
          I worked for Microsoft for two years, providing technical support across
          multiple enterprise product lines.
        </p>

        {/* Two Column Layout */}
        <div className="experience-grid">
          {EXPERIENCE_DATA.map((role) => (
            <ExperienceItem key={role.id} role={role} />
          ))}
        </div>
      </div>

      <style>{`
        .microsoft-experience {
          padding: 4rem 0;
          font-family: var(--font-sans), Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        /* Main Container Box - Light Piano Theme */
        .microsoft-container {
          border: 1px solid var(--color-border, rgba(229, 231, 235, 0.8));
          border-radius: var(--radius-xl, 24px);
          /* 纯白卡片背景 */
          background: var(--color-surface, #ffffff);
          box-shadow: var(--shadow-card);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .microsoft-container:hover {
          box-shadow: var(--shadow-card-hover);
        }

        /* Logo Strip */
        .logo-strip {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid var(--color-border-soft, rgba(229, 231, 235, 0.5));
          /* 浅灰背景 */
          background: var(--color-section-bg, #f0f2f5);
        }

        .microsoft-logo {
          width: 32px;
          height: 32px;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .logo-text {
          /* 黑色标题文字 */
          color: var(--color-text, #1a1a1a);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }

        /* Intro Text */
        .intro-text {
          margin: 0;
          padding: 1.5rem 2rem;
          /* 深灰正文 */
          color: var(--color-text-body, #4b5563);
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 400;
          border-bottom: 1px solid var(--color-border-soft, rgba(229, 231, 235, 0.5));
          background: var(--color-bg-soft, #fafafa);
        }

        /* Two Column Grid */
        .experience-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
        }

        .experience-column {
          padding: 2rem;
          border-right: 1px solid var(--color-border-soft, rgba(229, 231, 235, 0.5));
          transition: background 0.2s ease;
        }

        .experience-column:last-child {
          border-right: none;
        }

        .experience-column:hover {
          /* hover时淡蓝背景 */
          background: rgba(59, 130, 246, 0.04);
        }

        /* Team Title */
        .team-title {
          display: inline-block;
          font-size: 1.25rem;
          font-weight: 700;
          /* 蓝色链接 */
          color: ${PRIMARY_BLUE};
          text-decoration: none;
          margin-bottom: 0.75rem;
          letter-spacing: -0.01em;
          transition: all 0.2s ease;
        }

        .team-title:hover {
          /* hover时绿色 */
          color: ${SECONDARY_GREEN};
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        /* Description */
        .description {
          margin: 0 0 1.25rem 0;
          font-size: 0.95rem;
          line-height: 1.6;
          /* 深灰色 */
          color: var(--color-text-body, #4b5563);
          font-weight: 400;
        }

        .highlights {
          margin: 0 0 1.25rem 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .highlight-item {
          font-size: 0.9rem;
          line-height: 1.5;
          /* 中灰色 */
          color: var(--color-muted, #6b7280);
          display: flex;
          gap: 0.625rem;
          font-weight: 400;
        }

        .bullet {
          /* 蓝色项目符号 */
          color: ${PRIMARY_BLUE};
          flex-shrink: 0;
          font-size: 0.75rem;
          margin-top: 0.125rem;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-tag {
          padding: 0.375rem 0.75rem;
          /* 浅灰背景标签 */
          background: var(--color-section-bg, #f0f2f5);
          /* 深灰文字 */
          color: var(--color-text-body, #4b5563);
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: var(--radius-sm, 8px);
          border: 1px solid var(--color-border, rgba(229, 231, 235, 0.8));
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .tech-tag:hover {
          /* hover时蓝色背景 */
          background: rgba(59, 130, 246, 0.1);
          color: ${PRIMARY_BLUE};
          border-color: ${PRIMARY_BLUE}30;
          text-decoration: underline;
          text-underline-offset: 2px;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .experience-grid {
            grid-template-columns: 1fr;
          }

          .experience-column {
            border-right: none;
            border-bottom: 1px solid var(--color-border-soft, rgba(229, 231, 235, 0.5));
            padding: 1.5rem;
          }

          .experience-column:last-child {
            border-bottom: none;
          }

          .logo-strip {
            padding: 1.25rem 1.5rem;
          }

          .intro-text {
            padding: 1.25rem 1.5rem;
            font-size: 0.95rem;
          }
        }

        @media (max-width: 480px) {
          .microsoft-experience {
            padding: 2rem 0;
          }

          .experience-column {
            padding: 1.25rem;
          }

          .team-title {
            font-size: 1.1rem;
          }

          .description {
            font-size: 0.9rem;
          }

          .highlight-item {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}
