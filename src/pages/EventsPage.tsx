import { useState } from 'react';
import { CalendarIcon, LocationIcon, PlusIcon } from '../assets';
import { Button, CardButton } from '../components';

export function EventsPage() {
	const [events, setEvents] = useState([
		{ id: 1, name: 'Выставка', title: 'Искусство XXI века', date: '31.12.2025', category: 'Культура', location: 'Москва, Арт-центр', description: '', active: false },
		{ id: 2, name: 'Концерт', title: 'Рок-фестиваль', date: '15.08.2025', category: 'Музыка', location: 'Санкт-Петербург, СК Юбилейный', description: '', active: false },
		{ id: 3, name: 'Лекция', title: 'Будущее технологий', date: '10.09.2025', category: 'Наука', location: 'Казань, Технопарк', description: '', active: false },
	]);

	const handleCardClick = (id: number) => {
		setEvents(prevEvents =>
			prevEvents.map(event => ({
				...event,
				active: event.id === id
			}))
		);
	};

	const handleDescriptionChange = (id: number, newDescription: string) => {
		setEvents(prevEvents =>
			prevEvents.map(event => 
				event.id === id ? { ...event, description: newDescription } : event
			)
		);
	};

	const activeEvent = events.find(event => event.active);

	return (
		<div className="flex min-h-[80vh] w-full">
			<aside className="mt-20 w-96 min-w-96 shrink-0 pl-2 pr-1">

				<button className="flex h-[57px] w-full items-center justify-center gap-3 bg-[white] bg-opacity-[3%] p-[10px]">
					<img src={PlusIcon} alt="Добавить событие" />
					<p className="font-semibold">Новое мероприятие</p>
				</button>
				<div className="mt-14 flex flex-col gap-5">
					{events.map(event => (
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

			<section className="mt-20 flex w-full flex-col items-center justify-start gap-5 ">
				{activeEvent ? (
					<>
						<h1 className='text-[32px] font-semibold'>{activeEvent.title}</h1>
						<div className='flex w-full items-center justify-start p-10 px-20'>
							<div className="w-full justify-start rounded-lg p-4">
								<div className="flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4">
									<img src={CalendarIcon} className='size-[18px]' alt="Дата"/>
									<span className="pl-2">Дата:</span>
									<span className="pl-4 font-semibold">{activeEvent.date}</span>
								</div>
								<div className="mt-10 flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4">
									<img src={LocationIcon} className='size-[18px]' alt="Место"/>
									<span className="pl-2">Место проведения:</span>
									<span className="pl-4 font-semibold">{activeEvent.location}</span>
								</div>
								<div className="mt-10">
									<textarea 
										className="mt-2 h-[30vh] w-full resize-none rounded-lg bg-primary-grey p-2 text-[white] outline-none focus:border-none"
										rows={4}
										placeholder="Добавьте описание события..."
										value={activeEvent.description}
										onChange={(e) => handleDescriptionChange(activeEvent.id, e.target.value)}
									/>

								</div>
								<Button
									appearance='smallButton'
									title='Сохранить'
									className='mt-5'
								/>
							</div>
							
						</div>
						
						
					</>
				) : (
					<p className='font-semibold text-[gray-500]'>Выберите мероприятие для просмотра деталей.</p>
				)}
			</section>
		</div>
	);
}
