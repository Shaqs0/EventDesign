import { LightMode } from '../assets';

export function SettingsPage () {
	return (
		<div className="flex h-[85vh] w-full  flex-col items-center justify-center">
			<div className='flex w-[650px] items-center justify-between'>
				<p className="grow text-center text-[32px] font-bold">Мой аккаунт</p>
				<img src={LightMode} className='ml-auto cursor-pointer'/>
			</div>
			<div className=" mt-16 flex h-2/5 w-[650px] flex-col items-start justify-start gap-12">
				<div className="flex w-full items-center gap-12">
					<p className="flex text-nowrap text-2xl text-[white]">Имя пользователя</p>
					<p className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0">Vladik</p>
				</div>
				<div className="flex w-full items-center gap-7">
					<p className="flex text-nowrap text-2xl text-[white]">Привязанный email</p>
					<p className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0">Vladik@gmail.com</p>
				</div>
			</div>
			<div className='flex items-center justify-center'>
				<button className="h-[65px] w-[316px] bg-[#D30505] text-2xl font-bold">
				Выйти из аккаунта
				</button>
			</div>
		</div>
	);
}