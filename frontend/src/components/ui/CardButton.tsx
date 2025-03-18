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
			className={`flex h-[150px] cursor-pointer flex-col items-center justify-between overflow-hidden rounded-[3px] pb-2 transition-colors duration-200 ${
				active ? 'bg-[white] bg-opacity-[10%]' : 'bg-[white] bg-opacity-[3%]'
			}`}
		>
			<div className="ml-4 mt-3 flex h-[100px] w-[362px] flex-col justify-center gap-y-2 p-5">
				<p className="text-xl font-semibold text-[white]">{name}</p>
				<p className="text-lg text-[white]">{title}</p>
			</div> 

			<div className="flex w-full items-start gap-4 pb-2 pl-8 pt-1">
				<p className="text-opacity-40">{new Date(date).toLocaleDateString('ru-RU')}</p> 
				<p className="text-opacity-60">{category}</p>
			</div>
		</div>
	);
}
