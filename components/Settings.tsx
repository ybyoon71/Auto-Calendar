
import React from 'react';
import { getISOString } from '../utils';

interface SettingsProps {
  baseDate: Date;
  onSetBaseDate: (date: Date) => void;
}

const Settings: React.FC<SettingsProps> = ({ baseDate, onSetBaseDate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <i className="fas fa-cog text-gray-500"></i>
        기준 날짜 설정 (Set)
      </h2>
      
      <div className="space-y-6">
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-yellow-800 text-sm">
          <p className="font-bold flex items-center gap-2 mb-1">
            <i className="fas fa-info-circle"></i>
            도움말
          </p>
          항상 매월 1일로 입력해두는 것이 정신 건강에 좋습니다. 달력은 이 날짜를 기준으로 월을 결정합니다.
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">기준 날짜 (B2 셀)</label>
          <input 
            type="date" 
            value={getISOString(baseDate)}
            onChange={(e) => onSetBaseDate(new Date(e.target.value))}
            className="w-full md:w-1/2 border-2 border-gray-200 p-3 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-lg font-medium"
          />
        </div>

        <div className="pt-6 border-t border-gray-100 text-gray-400 text-xs">
          © Automated Perpetual Calendar Web Application - Ported from Excel Guide
        </div>
      </div>
    </div>
  );
};

export default Settings;
