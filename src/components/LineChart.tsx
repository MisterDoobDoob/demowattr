import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface LineChartProps {
  data: { day: string; usage: number }[];
  title: string;
}

interface HoverData {
  x: number;
  y: number;
  usage: number;
  day: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const [hoveredPoint, setHoveredPoint] = useState<HoverData | null>(null);
  
  const maxUsage = Math.max(...data.map(d => d.usage));
  const minUsage = Math.min(...data.map(d => d.usage));
  const range = maxUsage - minUsage;
  const padding = range * 0.1;

  const chartHeight = 200;
  const chartWidth = 400;

  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((d.usage - minUsage + padding) / (range + 2 * padding)) * chartHeight;
    return { x, y, usage: d.usage, day: d.day };
  });

  const pathData = points.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  const handleMouseEnter = (point: HoverData) => {
    setHoveredPoint(point);
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <div className="relative">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-48"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          
          {/* Area under curve */}
          <path
            d={`${pathData} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`}
            fill="url(#areaGradient)"
          />
          
          {/* Main line */}
          <path
            d={pathData}
            stroke="url(#lineGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="6"
              fill="#60a5fa"
              stroke="#3b82f6"
              strokeWidth="2"
              className="hover:r-8 transition-all duration-200 cursor-pointer"
              onMouseEnter={() => handleMouseEnter(point)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
          
          {/* Tooltip */}
          {hoveredPoint && (
            <g>
              {/* Tooltip background */}
              <rect
                x={hoveredPoint.x - 25}
                y={hoveredPoint.y - 35}
                width="50"
                height="25"
                fill="rgba(31, 41, 55, 0.95)"
                stroke="#60a5fa"
                strokeWidth="1"
                rx="4"
                ry="4"
              />
              {/* Tooltip text */}
              <text
                x={hoveredPoint.x}
                y={hoveredPoint.y - 18}
                textAnchor="middle"
                className="text-xs fill-white font-medium"
              >
                {hoveredPoint.usage}L
              </text>
            </g>
          )}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          {data.map((d, index) => (
            <span key={index} className="text-center">
              {d.day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineChart;