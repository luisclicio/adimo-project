import { AppGrid } from './AppGrid';
import { EventCard } from './EventCard';

export function EventsGrid({ events = [] }) {
  return (
    <AppGrid>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          local={event.location}
          slug={event.slug}
          image={event.coverImage.url}
          date={event.date}
        />
      ))}
    </AppGrid>
  );
}
