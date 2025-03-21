import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Profile } from '../interfaces/profile.interface';
import { LogoWhite } from '../assets';
import { loginUser, registerUser } from '../api/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function SignPage() {
	const [isSignIn, setIsSignIn] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const navigate = useNavigate();
	
	const isAuthenticated = !!Cookies.get('accessToken'); 

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<Profile>();

	const onSubmit = async (data: Profile) => {
		try {
			setErrorMessage(null);
			if (isSignIn) {
				await loginUser(data);
			} else {
				await registerUser(data);
			}
			reset();
			navigate('/');

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			setErrorMessage(error?.message || 'Ошибка сервера');
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center dark:text-[black]">
			<div className="h-[650px] w-full max-w-md">
				<div className="flex justify-center gap-4">
					<img src={LogoWhite} alt="Logo" />
					<p className="text-center text-3xl font-medium">EventDesign</p>
				</div>
				<div className="mt-16 flex justify-center space-x-4 rounded-lg bg-[#272727] dark:bg-[#EFEFEF]">
					<button
						className={`m-1 w-1/2 rounded-lg px-5 py-2 ${isSignIn ? 'bg-[#0A0A0A] dark:bg-[#ffffff]' : 'bg-[#272727] dark:bg-[#EFEFEF]'}`}
						onClick={() => setIsSignIn(true)}
					>
            Войти
					</button>
					<button
						className={`m-1 w-1/2 -translate-x-1 rounded-lg px-5 py-2 ${!isSignIn ? 'bg-[#0A0A0A] dark:bg-[#ffffff]' : 'bg-[#272727] dark:bg-[#EFEFEF]'}`}
						onClick={() => setIsSignIn(false)}
					>
            Зарегистрироваться
					</button>
				</div>
				<form className="mt-10 space-y-4" onSubmit={handleSubmit(onSubmit)}>

					{!isSignIn && (
						<>
							<div className="relative">
								<input
									type="text"
									className="peer mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
									{...register('user_name', { required: 'Имя обязательно' })} 
									placeholder="Имя"
									autoComplete="off"
								/>
								{errors.user_name && <p className="mt-1 text-sm text-[red-500]">{errors.user_name.message}</p>}
							</div>
							<div className="relative">
								<input
									type="email"
									className="peer mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
									{...register('email', { required: 'Email обязателен' })}
									placeholder="Email"
									autoComplete="username"
								/>
								{errors.email && <p className="mt-1 text-sm text-[red-500]">{errors.email.message}</p>}
							</div>
						</>
					)}

					<div className="relative">
						<input
							type="text"
							className="peer mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]" 
							{...register('login', { required: 'Логин обязателен' })}
							placeholder="Логин"
							autoComplete="off"
						/>
						{errors.login && <p className="mt-1 text-sm text-[red-500]">{errors.login.message}</p>}
					</div>
					<div className="relative">
						<input
							type="password"
							className="peer mt-2 w-full border-b border-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0 dark:bg-[white]"
							{...register('password', {
								required: 'Пароль обязателен',
								minLength: {
									value: 10,
									message: 'Пароль должен содержать минимум 10 символов',
								},
							})}
							placeholder="Пароль"
							autoComplete={isSignIn ? 'current-password' : 'new-password'}
						/>
						{errors.password && <p className="mt-1 text-sm text-[red-500]">{errors.password.message}</p>}
					</div>
					{errorMessage && typeof errorMessage === 'string' && (
						<p className="mt-3 text-center text-sm text-[red-500]">{errorMessage}</p>
					)}

					<div>
						<button
							type="submit"
							className="mt-8 w-full rounded-lg bg-primary-blue py-2 font-bold text-[white] hover:bg-[gray-800] dark:bg-[black]"
						>
							{isSignIn ? 'Войти' : 'Зарегистрироваться'}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
