import React, { useState } from 'react';
import Header from './components/Header';
import TotalUsage from './components/TotalUsage';
import ControlPanel, { ProfileSwitcher } from './components/ControlPanel';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';

// Mock data for different shower profiles
const mockData = {
  Bathroom: {
    weeklyData: [
      { day: 'Mon', usage: 205 },
      { day: 'Tue', usage: 220 },
      { day: 'Wed', usage: 195 },
      { day: 'Thu', usage: 212 },
      { day: 'Fri', usage: 210 },
      { day: 'Sat', usage: 175 },
      { day: 'Sun', usage: 196 }
    ],
    goal: 1500
  },
  'Guest Shower': {
    weeklyData: [
      { day: 'Mon', usage: 145 },
      { day: 'Tue', usage: 90 },
      { day: 'Wed', usage: 80 },
      { day: 'Thu', usage: 77 },
      { day: 'Fri', usage: 110 },
      { day: 'Sat', usage: 185 },
      { day: 'Sun', usage: 76 }
    ],
    goal: 800
  }
};

function App() {
  const [currentProfile, setCurrentProfile] = useState<'Bathroom' | 'Guest Shower'>('Bathroom');
  const [profileGoals, setProfileGoals] = useState({
    Bathroom: 1500,
    'Guest Shower': 800
  });

  const handleProfileToggle = () => {
    setCurrentProfile(currentProfile === 'Bathroom' ? 'Guest Shower' : 'Bathroom');
  };

  const handleGoalChange = (newGoal: number) => {
    setProfileGoals(prev => ({
      ...prev,
      [currentProfile]: newGoal
    }));
  };

  const currentData = mockData[currentProfile];
  const totalUsage = currentData.weeklyData.reduce((sum, day) => sum + day.usage, 0);
  const currentGoal = profileGoals[currentProfile];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header currentProfile={currentProfile} />
      
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProfileSwitcher
              currentProfile={currentProfile}
              onProfileToggle={handleProfileToggle}
            />
            <TotalUsage 
              totalUsage={totalUsage}
              goal={currentGoal}
              currentProfile={currentProfile}
            />
            <ControlPanel
              goal={currentGoal}
              onGoalChange={handleGoalChange}
              currentProfile={currentProfile}
              onProfileToggle={handleProfileToggle}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <LineChart 
              data={currentData.weeklyData} 
              title="Daily Water Usage Trend"
            />
            <BarChart 
              data={currentData.weeklyData} 
              title="Weekly Usage Comparison"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;