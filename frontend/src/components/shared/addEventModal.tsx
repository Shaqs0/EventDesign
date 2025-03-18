import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Button } from '../ui/Button';
import { createEvent } from '../../api/createEvents';
import { Event } from '../../interfaces/event.interface';

export function AddEventModal({ onClose, onSave }: { onClose: () => void; onSave: (event: Event) => void }) {
	const { control, handleSubmit, formState: { errors } } = useForm<Event>();
	const [category, setCategory] = useState('');
	const [isFavorite, setIsFavorite] = useState(false);

	const onSubmit: SubmitHandler<Event> = async (data) => {
		try {
			const eventData = {
				...data,
				category,
				description: data.description || '', 
				favorite: isFavorite,
			};
			await createEvent(eventData);
			onSave(eventData); 
			onClose();
		} catch (error) {
			console.error('Ошибка при создании мероприятия:', error);
		}
	};

	return (
		<>
			<div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-[black] bg-opacity-[75%]">
				<div className="max-w-[600px] rounded-md bg-primary-grey p-6">
					<p className='text-[33px]'>Добавление мероприятия</p>
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
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
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
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
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
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
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
										className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
										placeholder="Место"
									/>
								)}
							/>
							{errors.location && <p className="mt-1 text-sm text-[red-500]">{String(errors.location.message)}</p>}
						</div>

						<div className="mt-10">
							<Controller
								name="description"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<textarea
										{...field}
										className="peer mt-2 h-[30vh] w-full resize-none rounded-lg bg-primary-grey p-2 text-[white] outline-none focus:border-none"
										placeholder="Добавьте описание события..."
									/>
								)}
							/>
							{errors.description && <p className="mt-1 text-sm text-[red-500]">{String(errors.description.message)}</p>}
						</div>

						<div className="mb-4">
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
								className="peer mt-2 flex w-full items-start border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
							>
								<option value="">Выберите категорию</option>
								<option value="Культура">Культура</option>
								<option value="Музыка">Музыка</option>
								<option value="Наука">Наука</option>
							</select>
							{!category && <p className="mt-1 text-sm text-[red-500]">Категория не выбрана</p>}
						</div>

						<div className="mt-4">
							<p className="text-lg">Добавить в избранное?</p>
							<div className="mt-2 flex">
								<button
									type="button"
									onClick={() => setIsFavorite(true)}
									className={`mr-2 rounded px-4 py-2 ${isFavorite ? 'bg-[blue-500]' : 'bg-[gray-500]'} text-[white]`}
								>
                  Да
								</button>
								<button
									type="button"
									onClick={() => setIsFavorite(false)}
									className={`rounded px-4 py-2 ${!isFavorite ? 'bg-[blue-500]' : 'bg-[gray-500]'} text-[white]`}
								>
                  Нет
								</button>
							</div>
						</div>

						<div className="mt-5 flex justify-between">
							<Button
								appearance='smallButton'
								title='Сохранить'
								className="rounded bg-[blue-500] px-4 py-2 text-[white] hover:bg-[blue-600]"
							/>
							<button
								type="button"
								onClick={onClose}
								className="rounded bg-[gray-500] px-4 py-2 text-[white] hover:bg-[gray-600]"
							>
                Закрыть
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
