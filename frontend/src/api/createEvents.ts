import { PREFIX } from '../helpers/API';
import { Event } from '../interfaces/event.interface';

export async function createEvent(eventData: Event) {
	try {
		console.log('Sending event data:', eventData);

		const response = await fetch(`${PREFIX}events`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(eventData),
		});
  
		if (!response.ok) {
			console.log(response.body);
			throw new Error('Ошибка при создании события');
		}
  
		return await response.json();
	} catch (error) {
		console.error('Ошибка API:', error);
		throw error;
	}
}
