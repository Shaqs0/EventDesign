import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../components';
import { PREFIX } from '../helpers/API';

interface Category {
  category_name: string;
}

export function ReportsPage() {
	const [activeTab, setActiveTab] = useState<'period' | 'category'>('period');
	const [categories, setCategories] = useState<Category[]>([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [category, setCategory] = useState('');
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await axios.get(`${PREFIX}events/categories`);
				setCategories(response.data);
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

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = async (data: any) => {
		try {
			let url = '';
			let payload = {};

			if (activeTab === 'period') {
				url = `${PREFIX}events/reports/by-period`;
				payload = {
					startDate: data.startDate,
					endDate: data.endDate,
				};
			} else if (activeTab === 'category') {
				url = `${PREFIX}events/reports/by-category`;
				payload = { category };
			}

			const response = await axios.post(url, payload, {
				headers: {
					'Content-Type': 'application/json',
				},
			});

			console.log('Результат:', response.data);
		} catch (error) {
			console.error('Ошибка отправки данных:', error);
		}
	};

	return (
		<div className="flex h-[85vh] items-center justify-center">
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
					{activeTab === 'period' && (
						<div className="relative">
							<label className="block text-sm font-medium text-[gray-400]">Период</label>
							<input
								type="date"
								className="mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none"
								{...register('startDate', { required: 'Дата начала обязательна' })}
								placeholder="Дата начала"
							/>
							{errors.startDate && <p className="mt-1 text-sm text-[red-500]">{errors.startDate.message}</p>}
							<input
								type="date"
								className="mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none"
								{...register('endDate', { required: 'Дата окончания обязательна' })}
								placeholder="Дата окончания"
							/>
							{errors.endDate && <p className="mt-1 text-sm text-[red-500]">{errors.endDate.message}</p>}
						</div>
					)}

					{activeTab === 'category' && (
						<div className="relative" ref={dropdownRef}>
							<label className="block text-sm font-medium text-[gray-400]">Категория</label>
							<div
								className="mt-2 w-full cursor-pointer border-b border-[#3D3D3D] bg-primary-grey p-2"
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								{category || 'Выберите категорию'}
							</div>
							{dropdownOpen && (
								<div className="absolute z-10 mt-2 max-h-32 w-full overflow-y-auto bg-primary-grey shadow-lg">
									{categories.map((categoryItem) => (
										<div
											key={categoryItem.category_name}
											className={`cursor-pointer p-2 hover:bg-[gray-700] ${
												category === categoryItem.category_name ? 'bg-[gray-600]' : ''
											}`}
											onClick={() => {
												setCategory(categoryItem.category_name);
												setValue('category', categoryItem.category_name);
												setDropdownOpen(false);
											}}
										>
											{categoryItem.category_name}
										</div>
									))}
								</div>
							)}
							{errors.category && <p className="mt-1 text-sm text-[red-500]">Категория не выбрана</p>}
						</div>
					)}

					<div className="pt-5">
						<Button appearance="bigButton" title="Сгенерировать отчет" />
					</div>
				</form>
			</div>
		</div>
	);
}
