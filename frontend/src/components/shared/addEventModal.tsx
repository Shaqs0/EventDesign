import { useEffect, useRef, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button } from '../ui/Button';
import { Event } from '../../interfaces/event.interface';
import { createEvent, updateEvent } from '../../api/fetchEvents'; 
import { PREFIX } from '../../helpers/API';

interface Category {
	category_name: string;
}

export function AddEventModal({
	onClose,
	onSave,
	eventId,
}: {
	onClose: () => void;
	onSave: (event: Event) => void;
	eventId?: string;
}) {
	const { control, handleSubmit, formState: { errors }} = useForm<Event>();
	const [category, setCategory] = useState('');
	const [isFavorite, setIsFavorite] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

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

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!dropdownRef.current?.contains(event.target as Node)) {
				setDropdownOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const onSubmit: SubmitHandler<Event> = async (data) => {
		try {
			const eventData = {
				...data,
				category,
				description: data.description || '',
				favorite: isFavorite,
			};

			if (eventId) {
				await updateEvent(eventId, eventData);
			} else {
				await createEvent(eventData);
			}

			onSave(eventData); 
			onClose();
		} catch (error) {
			console.error('Ошибка при сохранении мероприятия:', error);
		}
	};

	return (
		<div className=' '>
			<div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-[black] bg-opacity-[75%] dark:bg-[white] dark:bg-opacity-[50%]">
				<div className="max-w-[600px] rounded-md bg-primary-grey p-6 dark:bg-[#f0f0f0]">
					<p className="text-[33px]">{eventId ? 'Редактирование мероприятия' : 'Добавление мероприятия'}</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4 mt-10">
							<Controller
								name="event_name"
								control={control}
								defaultValue=""
								rules={{ required: 'Name is required' }}
								render={({ field }) => (
									<input
										type="text"
										{...field}
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
										placeholder="Имя"
									/>
								)}
							/>
							{errors.event_name && <p className="mt-1 text-sm text-[red-500]">{String(errors.event_name.message)}</p>}
						</div>

						<div className="mb-4">
							<Controller
								name="title"
								control={control}
								defaultValue=""
								rules={{ required: 'Title is required' }}
								render={({ field }) => (
									<input
										type="text"
										{...field}
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
										placeholder="Название"
									/>
								)}
							/>
							{errors.title && <p className="mt-1 text-sm text-[red-500]">{String(errors.title.message)}</p>}
						</div>

						<div className="mb-4">
							<Controller
								name="event_date"
								control={control}
								defaultValue=""
								rules={{ required: 'Date is required' }}
								render={({ field }) => (
									<input
										type="date"
										{...field}
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
									/>
								)}
							/>
							{errors.event_date && <p className="mt-1 text-sm text-[red-500]">{String(errors.event_date.message)}</p>}
						</div>

						<div className="mb-4">
							<Controller
								name="location"
								control={control}
								defaultValue=""
								rules={{ required: 'Location is required' }}
								render={({ field }) => (
									<input
										type="text"
										{...field}
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
										placeholder="Место"
									/>
								)}
							/>
							{errors.location && <p className="mt-1 text-sm text-[red-500]">{String(errors.location.message)}</p>}
						</div>

						<div className="relative mb-4" ref={dropdownRef}>
							<div
								className="peer mt-2 flex w-full cursor-pointer items-start border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								{category || 'Выберите категорию'}
							</div>
							{dropdownOpen && (
								<div className="absolute z-10 mt-2 max-h-32 w-full overflow-y-auto bg-primary-grey shadow-lg dark:bg-[white]">
									{categories.map((categoryItem) => (
										<div
											key={categoryItem.category_name}
											className={`cursor-pointer p-2 hover:bg-[gray-700] ${
												category === categoryItem.category_name ? 'bg-[gray-600]' : ''
											}`}
											onClick={() => {
												setCategory(categoryItem.category_name);
												setDropdownOpen(false);
											}}
										>
											{categoryItem.category_name}
										</div>
									))}
								</div>
							)}
							{category === '' && <p className="mt-1 text-sm text-[red-500]">Категория не выбрана</p>}
						</div>


						<div className="mb-4">
							<Controller
								name="description"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<textarea
										{...field}
										className="peer mt-2 h-[15vh] w-full resize-none rounded-lg bg-primary-grey p-2 text-[white] outline-none focus:border-none dark:bg-[white] dark:text-[black]"
										placeholder="Добавьте описание события..."
									/>
								)}
							/>
						</div>

						<div className="mt-4">
							<p className="text-lg">Добавить в избранное?</p>
							<div className="mt-2 flex">
								<button
									type="button"
									onClick={() => setIsFavorite(true)}
									className={`mr-2 rounded px-4 py-2 ${
										isFavorite ? 'relative after:absolute after:bottom-[3px] after:left-0 after:h-[2px] after:w-full after:bg-[#ffffff] dark:after:bg-[#000000] ' : ''
									} `}
								>
      Да
								</button>
								<button
									type="button"
									onClick={() => setIsFavorite(false)}
									className={`rounded px-4 py-2 ${
										!isFavorite ? 'relative after:absolute after:bottom-[3px] after:left-0 after:h-[2px] after:w-full after:bg-[#ffffff] dark:after:bg-[#000000]' : ''
									} `}
								>
      Нет
								</button>
							</div>
						</div>



						<div className="mt-5 flex justify-between">
							<Button
								appearance="smallButton"
								title={eventId ? 'Сохранить изменения' : 'Сохранить'}
								className="rounded bg-[blue-500] px-4 py-2 text-[white] hover:bg-[blue-600]"
							/>
							<button
								type="button"
								onClick={onClose}
								className="rounded bg-[gray-500] px-4 py-2 text-[white] hover:bg-[gray-600] dark:text-[black]"
							>
								Закрыть
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
