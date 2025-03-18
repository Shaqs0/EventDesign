import { useEffect, useState } from 'react';
import { CalendarIcon, LocationIcon, StarNFill, StartFill } from '../assets';
import { CardButton } from '../components';
import { Event } from '../interfaces/event.interface';
import { fetchEvents } from '../api/events';
import { updateEventFavorite } from '../api/fetchEvents';

export function FavoritePage() {
	const [events, setEvents] = useState<Event[]>([]);
	const [activeEventId, setActiveEventId] = useState<number | null>(null);

	useEffect(() => {
		const loadEvents = async () => {
			const fetchedEvents = await fetchEvents();
			const formattedEvents = fetchedEvents.map(event => ({
				...event,
				category: event.category_name ? { category_name: event.category_name } : { category_name: '' },
			}));
			setEvents(formattedEvents.filter(event => event.favorite === 1)); 
		};

		loadEvents();
	}, []);

	const handleCardClick = (eventId: number) => {
		setActiveEventId(eventId);
	};

	const activeEvent = events.find(event => event.event_id === activeEventId);

	const handleFavoriteToggle = async (eventId: number, currentFavorite: boolean) => {
		const updatedFavoriteStatus = currentFavorite ? 0 : 1;
		const updatedEvent = { event_id: eventId, favorite: updatedFavoriteStatus };

		await updateEventFavorite(updatedEvent);

		setEvents(prevEvents =>
			prevEvents.filter(event => event.event_id !== eventId) 
		);
	};

	return (
		<div className="flex min-h-[80vh] w-full">
			<aside className="mt-20 h-[650px] w-96 min-w-96 shrink-0 overflow-y-scroll pl-2 pr-1">
				<div className="flex flex-col gap-5">
					{events.length > 0 ? (
						events.map((event, index) => (
							<CardButton
								key={event.event_id ?? index}
								name={event.event_name}
								title={event.title}
								date={event.event_date}
								category={event.category_name}
								active={event.event_id === activeEventId}
								onClick={() => handleCardClick(event.event_id)}
							/>
						))
					) : (
						<p className="text-center font-semibold text-[gray-500]">Нет избранных мероприятий</p>
					)}
				</div>
			</aside>

			<section className="mt-20 flex w-full flex-col items-center justify-start gap-5">
				{activeEvent ? (
					<>
						<div className="flex w-[88%] items-center justify-between">
							<h1 className="grow text-center text-[32px] font-semibold">{activeEvent.title}</h1>
							<img
								src={activeEvent.favorite === 1 ? StartFill : StarNFill}
								className="ml-auto cursor-pointer"
								onClick={() => handleFavoriteToggle(activeEvent.event_id, activeEvent.favorite === 1)}
							/>
						</div>

						<div className="flex w-full items-center justify-start p-10 px-20">
							<div className="w-full justify-start rounded-lg p-4">
								<div className="flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4">
									<img src={CalendarIcon} className="size-[18px]" alt="Дата" />
									<span className="pl-2">Дата:</span>
									<span className="pl-4 font-semibold">{new Date(activeEvent.event_date).toLocaleDateString('ru-RU')}</span>
								</div>
								<div className="mt-10 flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4">
									<img src={LocationIcon} className="size-[18px]" alt="Место" />
									<span className="pl-2">Место проведения:</span>
									<span className="pl-4 font-semibold">{activeEvent.location}</span>
								</div>
								<div className="mt-10">
									<div className="mt-2 h-[30vh] w-full rounded-lg bg-primary-grey p-2 text-[white]">
										{activeEvent.description ? (
											<p>{activeEvent.description}</p>
										) : (
											<p className="italic text-[gray-400]">Описание события не предоставлено.</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				) : (
					<p className="font-semibold text-[gray-500]">Выберите мероприятие для просмотра деталей.</p>
				)}
			</section>
		</div>
	);
}
