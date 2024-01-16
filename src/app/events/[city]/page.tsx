import EventsList from '@/components/event-list';
import H1 from '@/components/h1';
import { capitalize } from '@/lib/utils';
import { Suspense } from 'react';
import Loading from './loading';
import { Metadata } from 'next';
import { z } from 'zod';

type Props = {
  params: {
    city: string;
  };
};

type EventPageProps = Props & {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  const city = params.city;

  return {
    title: city === 'all' ? 'All Events' : `Events in ${capitalize(city)}`,
  };
}

async function EventsPage({ params, searchParams }: EventPageProps) {
  const city = params.city;
  // const page = searchParams.page || 1;
  const pageNumberSchema = z.coerce.number().int().positive().optional();
  const parsedPage = pageNumberSchema.safeParse(searchParams.page);

  if (parsedPage.success === false) {
    // return <div>Invalid page number</div>;
    throw new Error('Invalid page number');
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === 'all' && 'All Events'}
        {city !== 'all' && `Events in ${capitalize(city)}`}
      </H1>
      <Suspense key={city + parsedPage.data} fallback={<Loading />}>
        <EventsList city={city} page={parsedPage.data} />
      </Suspense>
    </main>
  );
}

export default EventsPage;
