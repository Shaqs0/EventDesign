import { useState, useEffect } from 'react';
import { CalendarIcon, LightCalendar, LocationIcon, Plus_n, PlusIcon, StarNFill, StartFill  } from '../assets';
import { AddEventModal, Button, CardButton, CategoryDropdown } from '../components';
import { Event } from '../interfaces/event.interface';
import { fetchEvents } from '../api/events';
import { deleteEvent, updateEventFavorite } from '../api/fetchEvents';

export function EventsPage() {
	const [events, setEvents] = useState<Event[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [activeEventId, setActiveEventId] = useState<number | null>(null);
	const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false); 
	const [reloadEvents, setReloadEvents] = useState(false); 
	const [selectedCategory, setSelectedCategory] = useState<string>('');

	const isLightTheme = localStorage.getItem('theme') === 'dark';

	useEffect(() => {
		const loadEvents = async () => {
			const fetchedEvents = await fetchEvents();
			const formattedEvents = fetchedEvents.map((event) => ({
				...event,
				category: event.category_name ? { category_name: event.category_name } : { category_name: '' },
			}));

			const filteredEvents = selectedCategory
				? formattedEvents.filter(event => event.category.category_name === selectedCategory)
				: formattedEvents;

			setEvents(filteredEvents);
		};

		loadEvents();
	}, [reloadEvents, selectedCategory]);

	const activeEvent = events.find((event) => event.event_id === activeEventId);

	const handleUpdateEvent = (updatedEvent: Event) => {
		setEvents((prevEvents) =>
			prevEvents.map((event) =>
				event.event_id === updatedEvent.event_id ? { ...event, ...updatedEvent } : event
			)
		);
		setReloadEvents((prev) => !prev); 
	};

	const handleCategoryChange = () => {
		setReloadEvents(prev => !prev); 
	};

	const handleFavoriteToggle = async (eventId: number, currentFavorite: boolean) => {
		const updatedFavoriteStatus = currentFavorite ? 0 : 1;
		const updatedEvent = { event_id: eventId, favorite: updatedFavoriteStatus };

		await updateEventFavorite(updatedEvent);

		setEvents((prevEvents) =>
			prevEvents.map((event) =>
				event.event_id === eventId ? { ...event, favorite: updatedFavoriteStatus } : event
			)
		);
	};

	const handleCardClick = (eventId: number) => {
		setActiveEventId(eventId);
	};

	const handleDeleteEvent = async (eventId: number) => {
		try {
			await deleteEvent(eventId);
			setReloadEvents((prev) => !prev); 
			setActiveEventId(null);
		} catch (error) {
			console.error('Ошибка при удалении события:', error);
			alert('Не удалось удалить событие. Попробуйте еще раз.');
		}
	};

	const handleEditEvent = () => {
		setIsEditButtonClicked(true);  
		setIsModalOpen(true); 
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsEditButtonClicked(false);  
	};

	return (
		<div className='dark:text-[black]'>
			<div className="mt-10 flex w-full items-center justify-start gap-4 px-5">
				<CategoryDropdown 
					selectedCategory={selectedCategory} 
					onSelect={setSelectedCategory} 
					onCategoryUpdate={handleCategoryChange} 
				/>
			</div>

			<div className="flex min-h-[80vh] w-full overflow-x-hidden">
				<aside className="mt-20 h-[650px] w-96 min-w-96 shrink-0 overflow-y-scroll pl-2 pr-1">
					<button
						className="flex h-[57px] w-full cursor-pointer items-center justify-center gap-3 bg-[white] bg-opacity-[3%] p-[10px] dark:bg-[#EFEFEF]"
						onClick={() => setIsModalOpen(true)}
					>
						<img src={isLightTheme ? Plus_n : PlusIcon} alt="Добавить событие" />
						<p className="font-semibold">Новое мероприятие</p>
					</button>
					<div className="mt-14 flex flex-col gap-5">
						{events.map((event) => (
							<CardButton
								key={event.event_id}
								name={event.event_name}
								title={event.title}
								date={event.event_date}
								category={event.category_name}
								active={event.event_id === activeEventId}
								onClick={() => handleCardClick(event.event_id)}
							/>
						))}
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

							<div className="flex w-full flex-col items-center justify-start p-10 px-20">
								<div className="w-full justify-start rounded-lg p-4">
									<div className="flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4 dark:border-[black]">
										<img src={isLightTheme ? LightCalendar : CalendarIcon} className="size-[18px]" alt="Дата" />
										<span className="pl-2">Дата:</span>
										<span className="pl-4 font-semibold">{new Date(activeEvent.event_date).toLocaleDateString('ru-RU')}</span>
									</div>
									<div className="mt-10 flex w-full items-center space-x-2 border-b border-[white] border-opacity-[10%] pb-4 dark:border-[black]">
										<img src={LocationIcon} className="size-[18px]" alt="Место" />
										<span className="pl-2">Место проведения:</span>
										<span className="pl-4 font-semibold">{activeEvent.location}</span>
									</div>
									<div className="mt-10">
										<div className="h-[30vh] max-h-[400px] max-w-[90vw] overflow-y-auto overflow-x-hidden rounded-lg bg-primary-grey p-2 text-[white] dark:bg-[white] dark:text-[black]" style={{ wordBreak: 'break-word' }}>
											{activeEvent.description ? (
												<p className="break-words text-sm md:text-base">{activeEvent.description}</p>
											) : (
												<p className="text-sm italic text-[gray-400] md:text-base">Описание события не предоставлено.</p>
											)}
										</div>
									</div>
								</div>
								<div className="ml-5 mt-5 flex w-full justify-start gap-10">
									<Button appearance="smallButton" title="Редактировать" onClick={handleEditEvent} />
									<button className="font-semibold" onClick={() => handleDeleteEvent(activeEvent.event_id)}>
									Удалить
									</button>
								</div>
							</div>
						</>
					) : (
						<p className="font-semibold text-[gray-500]">Выберите мероприятие для просмотра деталей.</p>
					)}
				</section>

				{isModalOpen && (
					<AddEventModal
						onClose={() => setIsModalOpen(false)}
						onSave={handleUpdateEvent}
					/>
				)}

				{(isModalOpen && isEditButtonClicked) && (
					<AddEventModal
						onClose={handleCloseModal}
						onSave={handleUpdateEvent}
						eventId={activeEventId ?? undefined}
					/>
				)}
			</div>
		</div>
	);
}