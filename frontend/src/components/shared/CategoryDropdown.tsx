import { useState, useEffect } from 'react';
import { PREFIX } from '../../helpers/API';
import { createCategory, updateCategory, deleteCategory } from '../../api/fetchCategory';

interface Category {
	category_name: string;
}

export function CategoryDropdown({
	selectedCategory,
	onSelect,
	onCategoryUpdate, 
}: {
	selectedCategory: string;
	onSelect: (category: string) => void;
	onCategoryUpdate: () => void; 
}) {
	const [categories, setCategories] = useState<Category[]>([]);
	const [newCategory, setNewCategory] = useState<string>('');
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editCategory, setEditCategory] = useState<string>('');

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await fetch(`${PREFIX}events/categories`);
				if (!response.ok) {
					throw new Error('Ошибка загрузки категорий');
				}
				const fetchedCategories = await response.json();
				setCategories(fetchedCategories);
			} catch (error) {
				console.error('Ошибка API:', error);
			}
		}
		fetchCategories();
	}, []);

	const handleCreateCategory = async () => {
		if (!newCategory) return;
		try {
			const createdCategory = await createCategory(newCategory);
			setCategories([...categories, createdCategory]);
			setNewCategory('');
			onCategoryUpdate(); 
		} catch (error) {
			console.error('Ошибка при создании категории:', error);
		}
	};

	const handleEditCategory = async (oldCategory: string) => {
		if (!editCategory) return;
		try {
			await updateCategory({ name: editCategory });
			setCategories(
				categories.map((cat) =>
					cat.category_name === oldCategory ? { category_name: editCategory } : cat
				)
			);
			setIsEditing(false);
			setEditCategory('');
			onCategoryUpdate();
		} catch (error) {
			console.error('Ошибка при редактировании категории:', error);
		}
	};

	const handleDeleteCategory = async (category: string) => {
		try {
			await deleteCategory(category);
			setCategories(categories.filter(cat => cat.category_name !== category));
			onCategoryUpdate(); 
		} catch (error) {
			console.error('Ошибка при удалении категории:', error);
		}
	};

	return (
		<div className="flex w-[1200px] flex-row items-center justify-center gap-8">
			<select
				className="w-[220px] rounded border border-[#94948a] bg-primary-grey p-2 dark:bg-[white]"
				value={selectedCategory || ''}
				onChange={(e) => onSelect(e.target.value)}
			>
				<option value="">Выберите категорию</option>
				{categories.map((category) => (
					<option key={category.category_name} value={category.category_name}>
						{category.category_name}
					</option>
				))}
			</select>

			<div className="flex flex-row">
				<input
					type="text"
					className="w-[200px] rounded border border-[#94948a] bg-primary-grey p-2 text-[black] dark:bg-[white] dark:text-[black]"
					placeholder="Новая категория"
					value={newCategory}
					onChange={(e) => setNewCategory(e.target.value)}
				/>
			</div>

			{isEditing && (
				<div className="flex gap-2">
					<input
						type="text"
						className="w-[200px] rounded border border-[#94948a]  bg-primary-grey p-2 dark:bg-[white] dark:text-[black]"
						value={editCategory}
						onChange={(e) => setEditCategory(e.target.value)}
					/>
				</div>
			)}

			<div className="flex gap-10">
				<button title="Добавить" onClick={handleCreateCategory}>Добавить</button>
				<button title="Сохранить" onClick={() => handleEditCategory(selectedCategory)}>Сохранить</button>
				<button title="Редактировать" onClick={() => setIsEditing(true)}>Редактировать</button>
				<button title="Удалить" onClick={() => handleDeleteCategory(selectedCategory)}>Удалить</button>
			</div>
		</div>
	);
}