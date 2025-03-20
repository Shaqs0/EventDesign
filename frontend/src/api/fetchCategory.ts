import { PREFIX } from '../helpers/API';

export async function createCategory(name:string) {
	try {
		console.log('Sending event data:', name);

		const response = await fetch(`${PREFIX}events/categories`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }), 
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

export const updateCategory = async (updatedCategory: { name: string}) => {
	try {

		const response = await fetch(`${PREFIX}events/${updatedCategory.name}/favorite`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: updatedCategory.name
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to update favorite status');
		}
	} catch (error) {
		console.error('Error updating favorite status:', error);
	}
};

export const deleteCategory = async (category: string) => {
	const response = await fetch(`${PREFIX}events/categories/${category}`, {
		method: 'DELETE',
	});
  
	if (!response.ok) {
		throw new Error('Ошибка при удалении категории');
	}
  
	return await response.json();
};
