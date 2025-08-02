import type { ReactNode } from 'react';
import type { CalendarView } from './types';
import { createContext, use, useEffect, useState } from 'react';

interface CalendarContextType {
  // Date management
  currentDate: Date;
  setCurrentDate: (date: Date) => void;

  // Calendar view
  view: CalendarView;
  setView: (view: CalendarView) => void;

  // Etiquette visibility management
  visibleColors: string[];
  toggleColorVisibility: (color: string) => void;
  isColorVisible: (color: string | undefined) => boolean;
  calendarOnly?: boolean;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export function useCalendarContext() {
  const context = use(CalendarContext);
  if (context === undefined) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider',
    );
  }
  return context;
}

interface CalendarProviderProps {
  children: ReactNode;
  defaultView?: CalendarView;
  onDateChange?: (date: Date) => void;
  calendarOnly?: boolean;
}

export function CalendarProvider({ children, defaultView = 'month', onDateChange, calendarOnly = false }: CalendarProviderProps) {
  const defaultDate = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(defaultDate);
  const [view, setView] = useState<CalendarView>(defaultView);

  useEffect(() => {
    onDateChange?.(currentDate);
  }, [currentDate, onDateChange]);

  // Initialize visibleColors based on the isActive property in etiquettes
  const [visibleColors, setVisibleColors] = useState<string[]>([]);

  // Toggle visibility of a color
  const toggleColorVisibility = (color: string) => {
    setVisibleColors((prev) => {
      if (prev.includes(color)) {
        return prev.filter(c => c !== color);
      }
      else {
        return [...prev, color];
      }
    });
  };

  // Check if a color is visible
  const isColorVisible = (color: string | undefined) => {
    if (!color)
      return true; // Events without a color are always visible
    return visibleColors.includes(color);
  };

  const value = {
    currentDate,
    setCurrentDate,
    visibleColors,
    toggleColorVisibility,
    isColorVisible,
    view,
    setView,
    calendarOnly,
  };

  return (
    <CalendarContext value={value}>
      {children}
    </CalendarContext>
  );
}
