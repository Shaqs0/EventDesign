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

export const updateEventFavorite = async (updatedEvent: { event_id: number; favorite: number }) => {
	try {
		const favorite = updatedEvent.favorite === 1;

		const response = await fetch(`${PREFIX}events/${updatedEvent.event_id}/favorite`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				event_id: updatedEvent.event_id,
				favorite: favorite,
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to update favorite status');
		}
	} catch (error) {
		console.error('Error updating favorite status:', error);
	}
};

export const deleteEvent = async (eventId: number) => {
	try {
		const response = await fetch(`${PREFIX}events/${eventId}`, {
			method: 'DELETE',
		});

		if (!response.ok) {
			throw new Error('Ошибка при удалении события');
		}

		return await response.json();
	} catch (error) {
		console.error('Ошибка при удалении события:', error);
		throw error;
	}
};


export const updateEvent = async (id: string, eventData: Event) => {
	const response = await fetch(`http://localhost:4200/api/events/${id}`, {
		method: 'PUT', 
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(eventData),
	});
	if (!response.ok) {
		throw new Error('Error updating event');
	}
	return response.json();
};



