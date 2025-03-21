import { useEffect, useRef, useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import axios from 'axios';
import { Button } from '../components';
import { PREFIX } from '../helpers/API';

interface Category {
  category_name: string;
}

interface EventData {
  user_name: string;
  event_name: string;
  category: string;
  event_date: string;
  location: string;
  description: string;
  favorite: string;
}

export function ReportsPage() {
	const [activeTab, setActiveTab] = useState<'period' | 'category'>('period');
	const [categories, setCategories] = useState<Category[]>([]);
	const [category, setCategory] = useState('');
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [reportData, setReportData] = useState<EventData[]>([]);  
	const [loading, setLoading] = useState(false); 
	const [error, setError] = useState<string | null>(null);  
	const [noData, setNoData] = useState(false); 
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
		setError: setFormError,
	} = useForm();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const onSubmit = async (data: any) => {
		if (new Date(data.startDate) > new Date(data.endDate)) {
			setFormError('startDate', {
				type: 'manual',
				message: 'Дата начала не может быть позже даты окончания',
			});
			return;
		}

		setLoading(true);
		setError(null);
		setNoData(false); 
		try {
			let url = '';
			if (activeTab === 'period') {
				url = `${PREFIX}events/reports/by-period?startDate=${data.startDate}&endDate=${data.endDate}`;
			} else if (activeTab === 'category') {
				url = `${PREFIX}events/reports/by-category?categoryName=${category}`;
			}

			const response = await axios.get(url);
			setReportData(response.data);

			if (response.data.length === 0) {
				setNoData(true);
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setError('Ошибка при получении данных');
				if (error.response?.status === 500) {
					setError('Мероприятий за выбранный период нет');
				}
			} else {
				setError('Неизвестная ошибка');
			}
			console.error('Ошибка отправки данных:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex h-[85vh] flex-col items-center justify-center overflow-x-scroll dark:text-[black]">
			<div className="h-[400px] w-full max-w-md">
				<div className="flex justify-center">
					<p className="text-center text-[32px] font-bold">Отчеты</p>
				</div>

				<div className="mt-8 flex justify-center space-x-4 rounded-lg bg-[#272727] dark:bg-[#EFEFEF]">
					<button
						className={`m-1 w-1/2 rounded-lg px-5 py-2 text-xl dark:text-[black] ${activeTab === 'period' ? 'bg-[#0A0A0A] dark:bg-[#ffffff]' : 'bg-[#272727] dark:bg-[#EFEFEF]'}`}
						onClick={() => setActiveTab('period')}
					>
						За период
					</button>
					<button
						className={`m-1 w-1/2 translate-x-[-4px] rounded-lg px-5 py-2 text-xl ${activeTab === 'category' ? 'bg-[#0A0A0A] dark:bg-[#ffffff]' : 'bg-[#272727] dark:bg-[#EFEFEF]'}`}
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
								className="mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none dark:bg-[#ffffff]"
								{...register('startDate', { required: 'Дата начала обязательна' })}
								placeholder="Дата начала"
							/>
							{errors.startDate && <p className="mt-1 text-sm text-[red-500]">{(errors.startDate as FieldError).message}</p>}
							<input
								type="date"
								className="mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none dark:bg-[#ffffff]"
								{...register('endDate', { required: 'Дата окончания обязательна' })}
								placeholder="Дата окончания"
							/>
							{errors.endDate && <p className="mt-1 text-sm text-[red-500]">{(errors.endDate as FieldError).message}</p>}
						</div>
					)}

					{activeTab === 'category' && (
						<div className="relative" ref={dropdownRef}>
							<label className="block text-sm font-medium text-[gray-400]">Категория</label>
							<div
								className="mt-2 w-full cursor-pointer border-b border-[#3D3D3D] bg-primary-grey p-2 dark:bg-[#ffffff]"
								onClick={() => setDropdownOpen(!dropdownOpen)}
							>
								{category || 'Выберите категорию'}
							</div>
							{dropdownOpen && (
								<div className="absolute z-10 mt-2 max-h-32 w-full overflow-y-auto bg-primary-grey shadow-lg dark:bg-[#ffffff]">
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

			{loading && <p>Загрузка...</p>} 
			{error && <p className="text-[red-500]">Ошибка при получении данных</p>}

			{!loading && noData && !error && (
				<p className="text-center text-[gray-500]">Нет данных по выбранным параметрам</p>
			)}

			{reportData.length > 0 && (
				<div className="mt-14 overflow-x-auto">
					<table className="min-w-full table-auto rounded-lg bg-[#272727] shadow-lg dark:bg-[#c9c9c9]">
						<thead className="bg-[#0A0A0A] text-[gray-300] dark:bg-[#c9c9c9]">
							<tr>
								<th className="px-4 py-2 text-left">Имя пользователя</th>
								<th className="px-4 py-2 text-left">Название мероприятия</th>
								{activeTab === 'period' && (
									<th className="px-4 py-2 text-left">Категория</th>
								)}
								<th className="px-4 py-2 text-left">Дата</th>
								<th className="px-4 py-2 text-left">Место</th>
								<th className="px-4 py-2 text-left">Описание</th>
								<th className="px-4 py-2 text-left">Избранное</th>
							</tr>
						</thead>
						<tbody>
							{reportData.map((event, index) => (
								<tr key={index} className={`hover:bg-[#333333] ${index % 2 === 0 ? 'bg-[#3A3A3A] dark:bg-[#ffffff]' : 'bg-[#272727] dark:bg-[#ececec]'}`}>
									<td className="px-4 py-2">{event.user_name}</td>
									<td className="px-4 py-2">{event.event_name}</td>
									{activeTab === 'period' && (
										<td className="px-4 py-2">{event.category}</td>
									)}
									<td className="px-4 py-2">{new Date(event.event_date).toLocaleDateString()}</td>
									<td className="px-4 py-2">{event.location}</td>
									<td className="px-4 py-2">{event.description}</td>
									<td className="px-4 py-2 text-center">{event.favorite}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
