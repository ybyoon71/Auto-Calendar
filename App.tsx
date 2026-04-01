
import React, { useState, useEffect, useCallback } from 'react';
import { ViewType, Schedule } from './types';
import Dashboard from './components/Dashboard';
import Database from './components/Database';
import Settings from './components/Settings';

const App: React.FC = () => {
  // 2단계: 기준 날짜 설정
  const [baseDate, setBaseDate] = useState<Date>(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  // 1단계: 시트 구조화 (State)
  const [activeTab, setActiveTab] = useState<ViewType>('Dash');
  const [schedules, setSchedules] = useState<Schedule[]>(() => {
    const saved = localStorage.getItem('calendar_db');
    return saved ? JSON.parse(saved) : [
      { date: '2025-10-02', item1: '회의', item2: '기획안 작성', item3: '런닝 5km' }
    ];
  });

  // Persist DB
  useEffect(() => {
    localStorage.setItem('calendar_db', JSON.stringify(schedules));
  }, [schedules]);

  // 6단계: 버튼으로 월 이동하기 logic
  const handleMonthChange = useCallback((increment: number) => {
    setBaseDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
  }, []);

  const handleDateClick = (dateStr: string) => {
    // Advanced: Quick jump to DB tab with specific date selected
    setActiveTab('DB');
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <i className="fas fa-calendar-check text-xl"></i>
              </div>
              <h1 className="text-xl font-extrabold text-gray-900 tracking-tight hidden sm:block">
                Auto Calendar <span className="text-blue-600">v1.0</span>
              </h1>
            </div>
            
            <nav className="flex bg-gray-100 p-1 rounded-xl">
              {(['Dash', 'DB', 'Set'] as ViewType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                    activeTab === tab 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'Dash' ? 'Dashboard' : tab === 'DB' ? 'Database' : 'Settings'}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'Dash' && (
          <Dashboard 
            baseDate={baseDate} 
            schedules={schedules} 
            onMonthChange={handleMonthChange}
            onDateClick={handleDateClick}
          />
        )}
        {activeTab === 'DB' && (
          <Database 
            schedules={schedules} 
            onUpdateSchedules={setSchedules} 
          />
        )}
        {activeTab === 'Set' && (
          <Settings 
            baseDate={baseDate} 
            onSetBaseDate={setBaseDate} 
          />
        )}
      </main>

      {/* Footer Info */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>엑셀 완전 자동화 달력 제작 가이드 기반 • 평생 사용 가능한 자동화 시스템</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
