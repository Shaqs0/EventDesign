import { useState } from 'react';
import { CalendarIcon, LocationIcon, PlusIcon } from '../assets';
import { CardButton } from '../components';

export function EventsPage() {
	const [events, setEvents] = useState([
		{ id: 1, name: 'Выставка', title: 'Искусство XXI века', date: '31.12.2025', category: 'Культура', active: false },
		{ id: 2, name: 'Выставка', title: 'Искусство XXI века', date: '31.12.2025', category: 'Культура', active: false },
		{ id: 3, name: 'Выставка', title: 'Искусство XXI века', date: '31.12.2025', category: 'Культура', active: false },
	]);

	const handleCardClick = (id: number) => {
		setEvents((prevEvents) =>
			prevEvents.map((event) => ({
				...event,
				active: event.id === id, 
			}))
		);
	};

	return (
		<main className="flex h-screen w-full">
			<aside className="w-96 bg-[gray-100] p-4">
				<button className="flex h-[57px] w-full items-center justify-center gap-3 bg-[white] bg-opacity-[3%] p-[10px]">
					<img src={PlusIcon} />
					<p className="font-semibold">Новое мероприятие</p>
				</button>
				<div className="mt-14 flex flex-col gap-5">
					{events.map((event) => (
						<CardButton
							key={event.id}
							name={event.name}
							title={event.title}
							date={event.date}
							category={event.category}
							active={event.active}
							onClick={() => handleCardClick(event.id)}
						/>
					))}
				</div>
			</aside>

			<section className="flex size-full flex-col items-center justify-start gap-5">
		
				<h1 className='text-[32px] font-semibold'>Выставка</h1>
				<div className='flex w-full items-center justify-start px-20'>
					<div className="w-full justify-start rounded-lg p-4">
						<div className="flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4">
							<img src={CalendarIcon} className='size-[18px]'/>
							<span className="pl-2">Дата:</span>
							<span className="pl-4 font-semibold">21.06.2022</span>
						</div>
						<div className="mt-10 flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4">
							<img src={LocationIcon} className='size-[18px]'/>
							<span className="pl-2">Место проведения:</span>
							<span className="pl-4 font-semibold ">Казань, Центральный парк</span>
						</div>
					</div>
				</div>
			
			</section>
		</main>

	);
}
