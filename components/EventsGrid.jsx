import { AppGrid } from './AppGrid';
import { EventCard } from './EventCard';

export function EventsGrid({ events }) {
  return (
    <AppGrid>
      {events.map((event) => (
        <EventCard
          key={event.slug}
          title={event.title}
          local={event.local}
          slug={event.slug}
          image={event.image}
          date={event.date}
        />
      ))}
    </AppGrid>
  );
}
