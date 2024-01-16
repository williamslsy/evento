import React from 'react';
import EventCard from './event-card';
import { getEvent, getEvents } from '@/lib/server-utils';
import PaginationControls from './pagination-controls';

type EventsListProps = {
  city: string;
  page?: number;
};

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  // await sleep(2000);
  // this is used to simulate a slow network connection

  // const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`);
  // cache: 'no-cache',
  // this is used to prevent caching of the fetch request
  // next: {
  //     revalidate: 300
  // }
  // this is used to set the revalidation time for the fetch request in cases where the rendered data can get updates

  // next js aggressively caches the result of a fetch request, so when the same url is requested again, it returns the cached result
  const { events, totalCount } = await getEvents(city, page);
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : '';
  const nextPath = totalCount > 6 * page ? `/events/${city}?page=${page + 1}` : '';

  return (
    <section className="flex flex-wrap gap-10 justify-center max-w-[1100px] px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
      <PaginationControls nextPath={nextPath} previousPath={previousPath} />
    </section>
  );
}
