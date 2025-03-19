import Cookies from 'js-cookie';
import { LightMode } from '../assets';
import { Link } from 'react-router-dom';
import { PREFIX } from '../helpers/API';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function SettingsPage() {
	const [userData, setUserData] = useState<{ login: string; email: string } | null>(null);

	const userId = Cookies.get('userId'); 

	const userInfo = async () => {
		if (!userId) {
			console.error('User ID not found');
			return;
		}

		try {
			const response = await axios.get(
				`${PREFIX}events/user/${userId}`
			);
			console.log('Server response:', response.data);
	
			setUserData(response.data);
			
		} catch (error) {
			console.error('Error fetching user info:', error);
		}
	};

	useEffect(() => {
		userInfo();
	}, []); 

	const handleLogout = () => {
		Cookies.remove('accessToken');
		Cookies.remove('refreshToken');
		Cookies.remove('userId'); 
	};

	return (
		<div className="flex h-[85vh] w-full flex-col items-center justify-center">
			<div className="flex w-[650px] items-center justify-between">
				<p className="grow text-center text-[32px] font-bold">Мой аккаунт</p>
				<img src={LightMode} className="ml-auto cursor-pointer" />
			</div>
			<div className="mt-16 flex h-2/5 w-[650px] flex-col items-start justify-start gap-12">
				<div className="flex w-full items-center gap-12">
					<p className="flex text-nowrap text-2xl text-[white]">Логин пользователя</p>
					<p className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0">
						{userData ? userData.login : 'Загрузка...'}
					</p>
				</div>
				<div className="flex w-full items-center gap-7">
					<p className="flex text-nowrap text-2xl text-[white]">Привязанный email</p>
					<p className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0">
						{userData ? userData.email : 'Загрузка...'}
					</p>
				</div>
			</div>
			<div className="flex items-center justify-center">
				<Link to='/sign'>
					<button
						onClick={handleLogout}
						className="h-[65px] w-[316px] bg-[#D30505] text-2xl font-bold"
					>
					Выйти из аккаунта
					</button>
				</Link>
			</div>
		</div>
	);
}
