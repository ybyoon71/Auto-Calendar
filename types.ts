
export interface Schedule {
  date: string; // ISO format: YYYY-MM-DD
  item1: string;
  item2: string;
  item3: string;
}

export type ViewType = 'Dash' | 'DB' | 'Set';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  schedule?: Schedule;
}
