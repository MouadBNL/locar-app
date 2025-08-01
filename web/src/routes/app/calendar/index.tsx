import { createFileRoute } from '@tanstack/react-router';
import { BigCalendar } from '@/components/big-calendar';
import { CalendarProvider } from '@/components/calendar/calendar-context';

export const Route = createFileRoute('/app/calendar/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CalendarProvider>
        <BigCalendar />
      </CalendarProvider>
    </div>
  );
}
