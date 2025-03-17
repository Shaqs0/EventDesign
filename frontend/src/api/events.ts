import axios from 'axios';
import { PREFIX } from '../helpers/API';
import { Event } from '../interfaces/event.interface';

export async function fetchEvents(): Promise<Event[]> {
	try {
		const response = await axios.get(
			`${PREFIX}events`
		);
		console.log('Server response:', response.data);

		return response.data;
		
	} catch (error) {
		console.error('Error fetching new products:', error);
		return [];
	}
}

