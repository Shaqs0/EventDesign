export function CardButton({ 
	name, 
	title, 
	date, 
	category, 
	active, 
	onClick 
}: { 
	name: string; 
	title: string; 
	date: string; 
	category: string; 
	active: boolean;
	onClick: () => void;
  }) {
  
	return (
		<div 
			onClick={onClick} 
			className={`flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[3px] pb-2 transition-colors duration-200 ${
				active ? 'bg-[white] bg-opacity-[10%]' : 'bg-[white] bg-opacity-[3%]'
			}`}
		>
			<div className="ml-4 mt-3 flex h-[125px] w-[362px] flex-col items-start justify-center gap-y-2 p-5">
				<p className="text-xl font-semibold text-[white]">{name}</p>
				<p className="text-lg text-[white]">{title}</p>
				<div className="flex gap-4">
					<p>{new Date(date).toLocaleDateString('ru-RU')}</p> 
					<p>{category}</p>
				</div>
			</div>
		</div>
	);
}
  