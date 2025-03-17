import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '../ui/Button';

export function AddEventModal({ onClose, onSave }: { onClose: () => void; onSave: (event: { name: string; title: string; date: string; location: string; description: string; category: string }) => void }) {
	const { control, handleSubmit, formState: { errors } } = useForm();
	const [category, setCategory] = useState('');

	const onSubmit = (data: { name: string; title: string; date: string; location: string; description: string; category: string }) => {
		onSave(data);
		onClose();
	};

	return (
		<>
			<div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-[black] bg-opacity-[75%]">
				<div className="max-w-[600px] rounded-md bg-primary-grey p-6">
					<p className='text-[33px]'>Добавление мероприятия</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4 mt-10">
							<Controller
								name="name"
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
							{errors.name && <p className="mt-1 text-sm text-[red-500]">{String(errors.name.message)}</p>}
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
								name="date"
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
							{errors.date && <p className="mt-1 text-sm text-[red-500]">{String(errors.date.message)}</p>}
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
