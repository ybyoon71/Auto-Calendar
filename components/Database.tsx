
import React, { useState } from 'react';
import { Schedule } from '../types';

interface DatabaseProps {
  schedules: Schedule[];
  onUpdateSchedules: (newSchedules: Schedule[]) => void;
}

const Database: React.FC<DatabaseProps> = ({ schedules, onUpdateSchedules }) => {
  const [newDate, setNewDate] = useState('');
  const [newI1, setNewI1] = useState('');
  const [newI2, setNewI2] = useState('');
  const [newI3, setNewI3] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate) return;
    
    const existingIdx = schedules.findIndex(s => s.date === newDate);
    let updated: Schedule[];
    
    if (existingIdx >= 0) {
      updated = [...schedules];
      updated[existingIdx] = { date: newDate, item1: newI1, item2: newI2, item3: newI3 };
    } else {
      updated = [...schedules, { date: newDate, item1: newI1, item2: newI2, item3: newI3 }];
    }
    
    onUpdateSchedules(updated);
    setNewI1('');
    setNewI2('');
    setNewI3('');
  };

  const handleDelete = (date: string) => {
    onUpdateSchedules(schedules.filter(s => s.date !== date));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <i className="fas fa-database text-blue-500"></i>
        일정 데이터베이스 (DB)
      </h2>

      {/* Input Form */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">날짜</label>
          <input 
            type="date" 
            value={newDate} 
            onChange={e => setNewDate(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">일정 1</label>
          <input 
            type="text" 
            value={newI1} 
            onChange={e => setNewI1(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="회의"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">일정 2</label>
          <input 
            type="text" 
            value={newI2} 
            onChange={e => setNewI2(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">일정 3</label>
          <input 
            type="text" 
            value={newI3} 
            onChange={e => setNewI3(e.target.value)}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors shadow-sm">
            저장
          </button>
        </div>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border text-xs font-bold text-gray-600 uppercase">날짜</th>
              <th className="p-3 border text-xs font-bold text-gray-600 uppercase">일정1</th>
              <th className="p-3 border text-xs font-bold text-gray-600 uppercase">일정2</th>
              <th className="p-3 border text-xs font-bold text-gray-600 uppercase">일정3</th>
              <th className="p-3 border text-xs font-bold text-gray-600 uppercase w-20">관리</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400 italic">저장된 일정이 없습니다.</td>
              </tr>
            ) : (
              schedules
                .sort((a, b) => a.date.localeCompare(b.date))
                .map(s => (
                <tr key={s.date} className="hover:bg-blue-50 transition-colors">
                  <td className="p-3 border text-sm font-medium">{s.date}</td>
                  <td className="p-3 border text-sm text-gray-700">{s.item1}</td>
                  <td className="p-3 border text-sm text-gray-700">{s.item2}</td>
                  <td className="p-3 border text-sm text-gray-700">{s.item3}</td>
                  <td className="p-3 border text-center">
                    <button 
                      onClick={() => handleDelete(s.date)}
                      className="text-red-400 hover:text-red-600 transition-colors p-1"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Database;
