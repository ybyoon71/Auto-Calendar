
import React from 'react';
import { CalendarDay, Schedule } from '../types';
import { getCalendarGrid, formatYearMonth } from '../utils';

interface DashboardProps {
  baseDate: Date;
  schedules: Schedule[];
  onMonthChange: (increment: number) => void;
  onDateClick: (date: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ baseDate, schedules, onMonthChange, onDateClick }) => {
  const grid = getCalendarGrid(baseDate, schedules);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto border border-gray-100">
      {/* 6단계: 버튼으로 월 이동하기 (Header) */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          {formatYearMonth(baseDate)}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => onMonthChange(-1)}
            className="p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-colors border border-blue-100"
            title="Previous Month"
          >
            <i className="fas fa-chevron-left text-xl"></i>
          </button>
          <button 
            onClick={() => onMonthChange(1)}
            className="p-3 rounded-full hover:bg-blue-50 text-blue-600 transition-colors border border-blue-100"
            title="Next Month"
          >
            <i className="fas fa-chevron-right text-xl"></i>
          </button>
        </div>
      </div>

      {/* 3단계: 요일 헤더 */}
      <div className="grid grid-cols-7 border-t border-l border-gray-200">
        {weekdays.map((day, idx) => (
          <div 
            key={day} 
            className={`py-3 text-center font-bold border-r border-b border-gray-200 bg-gray-50 
              ${idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-600'}`}
          >
            {day}
          </div>
        ))}

        {/* 3~5단계: 달력 날짜 및 일정 채우기 */}
        {grid.map((day, idx) => {
          const isSunday = idx % 7 === 0;
          const isSaturday = idx % 7 === 6;
          
          return (
            <div 
              key={idx} 
              onClick={() => onDateClick(day.date.toISOString().split('T')[0])}
              className={`min-h-[120px] p-2 border-r border-b border-gray-200 transition-all hover:bg-blue-50 cursor-pointer group
                ${day.isCurrentMonth ? 'bg-white' : 'bg-gray-100 text-gray-400'}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`text-sm font-semibold p-1 rounded-md
                  ${day.isCurrentMonth ? (isSunday ? 'text-red-500' : isSaturday ? 'text-blue-500' : 'text-gray-700') : 'text-gray-400'}`}>
                  {day.date.getDate()}
                </span>
                {day.isCurrentMonth && (
                  <i className="fas fa-plus text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                )}
              </div>

              {/* 5단계: IFERROR(VLOOKUP...) 대체하는 일정 표시 */}
              <div className="space-y-1 overflow-hidden">
                <div className="text-[11px] truncate bg-blue-100 text-blue-800 rounded px-1 min-h-[16px] leading-tight">
                  {day.schedule?.item1 || ''}
                </div>
                <div className="text-[11px] truncate bg-green-100 text-green-800 rounded px-1 min-h-[16px] leading-tight">
                  {day.schedule?.item2 || ''}
                </div>
                <div className="text-[11px] truncate bg-purple-100 text-purple-800 rounded px-1 min-h-[16px] leading-tight">
                  {day.schedule?.item3 || ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
