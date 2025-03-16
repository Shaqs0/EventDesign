export type designEv = {
  event_name: string;
  category?: string;
  event_date?: string;
  location?: string;
  description?: string;
  note?: string;
  title?: string;
  favorite?: boolean; // Add this if it's part of the frontend payload
};
