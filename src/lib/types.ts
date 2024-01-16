export type EventType = {
  id: number;
  name: string;
  slug: string;
  city: string;
  location: string;
  date: Date;
  organizerName: string;
  imageUrl: string;
  description: string;
};
// we have replaced this types with the ones from prisma because its not a good practice to have the same types in different places. there has to be one source of truth.
