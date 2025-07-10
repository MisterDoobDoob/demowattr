import React from 'react';
import { BarChart3 } from 'lucide-react';

interface BarChartProps {
  data: { day: string; usage: number }[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  const maxUsage = Math.max(...data.map(d => d.usage));

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg font-bold text-white">{title}</h3>
      </div>
      
      <div className="relative">
        <svg viewBox="0 0 400 200" className="w-full h-48">
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          
          {data.map((d, index) => {
            const barWidth = 45;
            const barSpacing = 55;
            const x = index * barSpacing + 10;
            const barHeight = (d.usage / maxUsage) * 160;
            const y = 180 - barHeight;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="url(#barGradient)"
                  rx="4"
                  ry="4"
                  className="hover:opacity-80 transition-opacity duration-200"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-xs fill-gray-300 font-medium"
                >
                  {d.usage}L
                </text>
              </g>
            );
          })}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-400 px-4">
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

export default BarChart;