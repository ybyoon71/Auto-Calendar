
import { CalendarDay, Schedule } from './types';

/**
 * Calculates the grid of dates for the perpetual calendar.
 * Logic: Starts from the Sunday before the 1st of the month.
 */
export const getCalendarGrid = (baseDate: Date, schedules: Schedule[]): CalendarDay[] => {
  const startOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  const endOfMonth = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0);
  
  // Calculate Sunday of the first week (B3 formula logic in Excel)
  // B3 = Set!$B$2 - WEEKDAY(Set!$B$2) + 1
  const firstDayOfWeekIndex = startOfMonth.getDay(); // Sunday is 0
  const startDate = new Date(startOfMonth);
  startDate.setDate(startOfMonth.getDate() - firstDayOfWeekIndex);

  const grid: CalendarDay[] = [];
  const tempDate = new Date(startDate);

  // We need 6 weeks (42 days) as per Excel guide
  for (let i = 0; i < 42; i++) {
    const currentDate = new Date(tempDate);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    grid.push({
      date: currentDate,
      isCurrentMonth: currentDate.getMonth() === startOfMonth.getMonth(),
      schedule: schedules.find(s => s.date === dateStr)
    });
    
    tempDate.setDate(tempDate.getDate() + 1);
  }

  return grid;
};

export const formatYearMonth = (date: Date): string => {
  return date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' });
};

export const getISOString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
