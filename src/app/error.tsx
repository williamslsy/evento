'use client'; // Error components must be Client Components

import H1 from '@/components/h1';
import { btnStyles } from '@/components/pagination-controls';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="text-center py-24">
      <H1 className="mb-5">Something went wrong!</H1>
      <h1 className="max-w-80 mx-auto">{error.message}</h1>
      <button
        className={cn(btnStyles, 'mx-auto mt-10')}
        onClick={
          // Attempt to recover by trying to re-render the segment
          reset
        }
      >
        Try again
      </button>
    </main>
  );
}
