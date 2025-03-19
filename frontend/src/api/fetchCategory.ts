import { PREFIX } from '../helpers/API';

export async function createCategory(category_name:string) {
	try {
		console.log('Sending event data:', category_name);

		const response = await fetch(`${PREFIX}events/categories`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(category_name),
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

export const updateCategory = async (updatedCategory: { category_name: string}) => {
	try {

		const response = await fetch(`${PREFIX}events/${updatedCategory.category_name}/favorite`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				category_name: updatedCategory.category_name
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to update favorite status');
		}
	} catch (error) {
		console.error('Error updating favorite status:', error);
	}
};

export const deleteEvent = async (category_name: string) => {
	try {
		const response = await fetch(`${PREFIX}events/${category_name}`, {
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


