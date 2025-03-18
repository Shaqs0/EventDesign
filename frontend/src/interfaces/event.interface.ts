export interface Event {
  category_name: string;
  event_id: number;
  id: number;
  event_name: string;
  title: string;
  event_date: string;
  location: string;
  description?: string;
  category: { category_name: string }; 
  active: boolean;
  favorite: boolean;
}
