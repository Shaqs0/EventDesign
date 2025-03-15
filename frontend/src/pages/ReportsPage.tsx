import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components';

export function ReportsPage() {
	const [activeTab, setActiveTab] = useState<'period' | 'category'>('period');
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		console.log('Форма отправлена:', data);
	};

	return (
		<div className="flex h-[85vh]  items-center justify-center">
			<div className="h-3/4 w-full max-w-md">
				<div className="flex justify-center">
					<p className="text-center text-[32px] font-bold">Отчеты</p>
				</div>

				<div className="mt-8 flex justify-center space-x-4 rounded-lg bg-[#272727]">
					<button
						className={`m-1 w-1/2 rounded-lg px-5 py-2 text-xl ${activeTab === 'period' ? 'bg-[#0A0A0A]' : 'bg-[#272727]'}`}
						onClick={() => setActiveTab('period')}
					>
            За период
					</button>
					<button
						className={`m-1 w-1/2 translate-x-[-4px] rounded-lg px-5 py-2 text-xl ${activeTab === 'category' ? 'bg-[#0A0A0A]' : 'bg-[#272727]'}`}
						onClick={() => setActiveTab('category')}
					>
            По категориям
					</button>
				</div>

				<form className="mt-10 grow space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="relative">
						<input
							type="text"
							className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
							{...register('name', { required: 'Имя обязательно' })}
							placeholder="Имя"
						/>
						{errors.name && <p className="mt-1 text-sm text-[red-500]">{String(errors.name.message)}</p>}
					</div>

					<div className="relative">
						<input
							type="text"
							className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
							{...register('title', { required: 'Название обязательно' })}
							placeholder="Название"
						/>
						{errors.title && <p className="mt-1 text-sm text-[red-500]">{String(errors.title.message)}</p>}
					</div>

					<div className="relative">
						<input
							type="text"
							className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
							{...register('date', { required: 'Дата обязательна' })}
							placeholder="Дата"
						/>
						{errors.date && <p className="mt-1 text-sm text-[red-500]">{String(errors.date.message)}</p>}
					</div>

					<div className="relative">
						<input
							type="text"
							className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
							{...register('location', { required: 'Место обязательно' })}
							placeholder="Место"
						/>
						{errors.location && <p className="mt-1 text-sm text-[red-500]">{String(errors.location.message)}</p>}
					</div>

					{activeTab === 'category' && (
						<div className="relative">
							<select
								className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
								{...register('category', { required: 'Выберите категорию' })}
							>
								<option value="">Выберите категорию</option>
								<option value="финансы">Финансы</option>
								<option value="продажи">Продажи</option>
								<option value="маркетинг">Маркетинг</option>
							</select>
							{errors.category && <p className="mt-1 text-sm text-[red-500]">{String(errors.category.message)}</p>}
						</div>
					)}

					<div className='pt-5'>
						<Button
							appearance='bigButton'
							title='Сгенерировать отчет'
						/>
					</div>
				</form>
			</div>
		</div>
	);
}
