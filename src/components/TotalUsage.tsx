import React from 'react';
import { TrendingUp, Target } from 'lucide-react';

interface TotalUsageProps {
  totalUsage: number;
  goal: number;
  currentProfile: string;
}

const TotalUsage: React.FC<TotalUsageProps> = ({ totalUsage, goal, currentProfile }) => {
  const progressPercentage = Math.min((totalUsage / goal) * 100, 100);
  const isOverGoal = totalUsage > goal;

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Weekly Usage</h2>
        <div className="flex items-center space-x-2 text-blue-400">
          <TrendingUp className="w-5 h-5" />
          <span className="text-sm font-medium">{currentProfile}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-4xl font-bold text-white">{totalUsage.toLocaleString()}</span>
          <span className="text-lg text-gray-400">L</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">Total water consumption this week</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Goal Progress</span>
          </div>
          <span className="text-sm font-medium text-gray-300">
            {goal.toLocaleString()}L target
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              isOverGoal 
                ? 'bg-gradient-to-r from-blue-400 to-red-500' 
                : 'bg-gradient-to-r from-blue-400 to-blue-600'
            }`}
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        
        <div className="mt-2 text-right">
          <span className={`text-sm font-medium ${
            isOverGoal ? 'text-red-400' : 'text-blue-400'
          }`}>
            {progressPercentage.toFixed(1)}% of goal
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalUsage;