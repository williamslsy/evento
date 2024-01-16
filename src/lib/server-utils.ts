// this is used to indicate that this file is only for server side rendering
import 'server-only';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import prisma from './db';
import { capitalize } from './utils';

// unstable_cache is used to cache the response of the function for 1 minute cos prisma doesn't have caching unlike fetch which nextjs caches by default.
export const getEvents = unstable_cache(async (city: string, page = 1) => {
  // const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`);
  // const events: EventType[] = await response.json();
  // use prisma to get the events
  const events = await prisma.event.findMany({
    where: {
      city: city == 'all' ? undefined : capitalize(city),
    },
    orderBy: {
      date: 'asc',
    },
    take: 6,
    skip: (page - 1) * 6,
  });
  let totalCount;
  if (city === 'all') {
    totalCount = await prisma.event.count();
  } else {
    totalCount = await prisma.event.count({
      where: {
        city: capitalize(city),
      },
    });
  }
  return { events, totalCount };
});

export async function getEvent(slug: string) {
  // const response = await fetch(`https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`);
  // const event: EventType = await response.json();

  // use prisma to get the event
  const event = await prisma.event.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    notFound();
  }
  return event;
}
