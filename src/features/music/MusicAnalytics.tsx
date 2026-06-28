import { useEffect, useState } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
} from 'recharts';

// Music Dimension Preference - Radar
const dimensionData = [
  { dimension: 'Melody', value: 90, fullMark: 100 },
  { dimension: 'Ambience', value: 90, fullMark: 100 },
  { dimension: 'Rhythm', value: 90, fullMark: 100 },
  { dimension: 'Vocals', value: 80, fullMark: 100 },
  { dimension: 'Energy', value: 70, fullMark: 100 },
  { dimension: 'Complexity', value: 60, fullMark: 100 },
];

// Music Genre Preference - Horizontal Bars
const genreData = [
  { genre: 'Folk', value: 90 },
  { genre: 'R&B', value: 90 },
  { genre: 'Pop', value: 85 },
  { genre: 'Classical', value: 80 },
  { genre: 'Rock', value: 72 },
  { genre: 'Jazz', value: 65 },
];

const genreColors = ['#8B5CF6', '#A855F7', '#C084FC', '#D8B4FE', '#E9D5FF', '#F3E8FF'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <span className="tooltip-value">{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

const MusicAnalytics = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`analytics-container ${isVisible ? 'visible' : ''}`}>
      {/* Charts Row */}
      <div className="charts-row">
        {/* Left - Radar Chart: Sound Profile */}
        <div className="chart-card">
          <h3 className="chart-label">Sound Profile</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={dimensionData}>
              <PolarGrid stroke="rgba(99, 102, 241, 0.15)" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
                tickLine={false}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Radar
                name="Preference"
                dataKey="value"
                stroke="#6366F1"
                fill="url(#radarGradient)"
                fillOpacity={0.6}
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="radarGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#A855F7" />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Right - Horizontal Bar Chart: Genre Preference */}
        <div className="chart-card">
          <h3 className="chart-label">Genre Preference</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={genreData} layout="vertical" margin={{ left: 5, right: 20 }}>
              <XAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
              <YAxis
                dataKey="genre"
                type="category"
                tick={{ fill: '#6B7280', fontSize: 11, fontWeight: 500 }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Bar
                dataKey="value"
                radius={[0, 6, 6, 0]}
                barSize={20}
              >
                {genreData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={genreColors[index % genreColors.length]} />
                ))}
              </Bar>
              <Tooltip content={<CustomTooltip />} cursor={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style>{`
        .analytics-container {
          margin-top: 3rem;
          padding: 1rem 0;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .analytics-container.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Charts Row */
        .charts-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .chart-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.5));
          border: 1px solid rgba(229, 231, 235, 0.6);
          border-radius: 16px;
          padding: 1.75rem;
          transition: all 0.3s ease;
        }

        .chart-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.2);
        }

        .chart-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #6B7280;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0 0 1rem 0;
        }

        /* Tooltip */
        .chart-tooltip {
          background: rgba(31, 41, 55, 0.95);
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .tooltip-value {
          color: white;
          font-weight: 600;
          font-size: 0.85rem;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .charts-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .analytics-container {
            padding: 1rem 0;
          }

          .chart-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MusicAnalytics;
