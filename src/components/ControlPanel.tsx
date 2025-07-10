import React, { useState } from 'react';
import { Settings, Target, ShowerHead as Shower, Users } from 'lucide-react';

interface ControlPanelProps {
  currentProfile: string;
  onProfileToggle: () => void;
  goal: number;
  onGoalChange: (newGoal: number) => void;
}

interface ProfileSwitcherProps {
  currentProfile: string;
  onProfileToggle: () => void;
}

interface GoalSetterProps {
  goal: number;
  onGoalChange: (newGoal: number) => void;
}

export const ProfileSwitcher: React.FC<ProfileSwitcherProps> = ({ 
  currentProfile, 
  onProfileToggle 
}) => {
  return (
    <button
      onClick={onProfileToggle}
      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 mb-6 text-sm font-medium"
    >
      {currentProfile === 'Bathroom' ? (
        <Shower className="w-4 h-4" />
      ) : (
        <Users className="w-4 h-4" />
      )}
      <span>
        Switch to {currentProfile === 'Bathroom' ? 'Guest Shower' : 'Bathroom'}
      </span>
    </button>
  );
};

export const GoalSetter: React.FC<GoalSetterProps> = ({ 
  goal, 
  onGoalChange 
}) => {
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [tempGoal, setTempGoal] = useState(goal.toString());

  const handleGoalSubmit = () => {
    const newGoal = parseInt(tempGoal);
    if (newGoal > 0) {
      onGoalChange(newGoal);
      setShowGoalInput(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 mb-6 border border-gray-700">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Goal Setting</h2>
      </div>
      
      <div className="relative">
        {!showGoalInput ? (
          <button
            onClick={() => setShowGoalInput(true)}
            className="flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Target className="w-5 h-5" />
            <span className="font-medium">Set Goal ({goal}L)</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
    <input
        type="number"
        value={tempGoal}
        onChange={(e) => setTempGoal(e.target.value)}
        className="w-full sm:flex-1 p-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter goal in liters"
        min="1"
    />
    {/* REMOVED sm:contents HERE */}
    <div className="flex space-x-2">
        <button
            onClick={handleGoalSubmit}
            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors duration-200"
        >
            Set
        </button>
        <button
            onClick={() => {
                setShowGoalInput(false);
                setTempGoal(goal.toString());
            }}
            className="flex-1 sm:flex-none bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-lg transition-colors duration-200"
        >
            Cancel
        </button>
    </div>
</div>
        )}
      </div>
    </div>
  );
};

const ControlPanel: React.FC<ControlPanelProps> = ({ 
  currentProfile, 
  onProfileToggle, 
  goal, 
  onGoalChange 
}) => {
  return (
    <GoalSetter goal={goal} onGoalChange={onGoalChange} />
  );
};

export default ControlPanel;