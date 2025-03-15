import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Profile } from '../interfaces/profile.interface';
import { LogoWhite } from '../assets';

export function SignPage() {
	const [isSignIn, setIsSignIn] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const {
		register,
		formState: { errors },
	} = useForm<Profile>();

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="h-[650px] w-full max-w-md">
				<div className='flex justify-center gap-4'>
					<img src={LogoWhite}/>
					<p className="text-center text-3xl font-medium">EventDesign</p>
				</div>
				<div className="mt-16 flex justify-center space-x-4 rounded-lg bg-[#272727]">
					<button
						className={`m-1 w-1/2 rounded-lg px-5 py-2  ${isSignIn ? 'bg-[#0A0A0A]' : 'bg-[gray-100]'}`}
						onClick={() => setIsSignIn(true)}
					>
            Войти
					</button>
					<button
						className={`m-1 w-1/2 translate-x-[-4px] rounded-lg px-5 py-2 ${!isSignIn ? 'bg-[#0A0A0A]' : 'bg-[#272727]'}`}
						onClick={() => setIsSignIn(false)}
					>
            Зарегистрироваться
					</button>
				</div>
				<form className="mt-32 space-y-4">
					<div className="relative">
						<input
							type="text"
							className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
							{...register('name', { required: 'Name is required' })}
							placeholder="Имя"
						/>
						{errors.name && <p className="mt-1 text-sm text-[red-500]">{String(errors.name.message)}</p>}
					</div>
					{!isSignIn && (
						<>
							<div className="relative">
								<input
									type="text"
									className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
									{...register('login', { required: 'Login is required' })}
									placeholder="Логин"
								/>
								{errors.login && <p className="mt-1 text-sm text-[red-500]">{String(errors.login.message)}</p>}
							</div>
							<div className="relative">
								<input
									type="email"
									className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
									{...register('email', { required: 'Email is required' })}
									placeholder="Email"
									autoComplete="username"
								/>
								{errors.email && <p className="mt-1 text-sm text-[red-500]">{String(errors.email.message)}</p>}
							</div>
						</>
					)}
					<div className="relative">
						<input
							type="password"
							className="peer mt-2 w-full border-b border-b-[#3D3D3D] bg-primary-grey p-2 focus:outline-none focus:ring-0"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 10,
									message: 'Password must be at least 10 characters',
								},
							})}
							placeholder="Пароль"
							autoComplete={isSignIn ? 'current-password' : 'new-password'}
						/>
						{errors.password && <p className="mt-1 text-sm text-[red-500]">{String(errors.password.message)}</p>}
					</div>
					{errorMessage && <p className="mt-3 text-center text-sm text-[red-500]">{errorMessage}</p>}
					<div>
						<button
							type="submit"
							className="mt-16 w-full rounded-lg bg-primary-blue py-2 font-bold text-[white] hover:bg-[gray-800]"
						>
							{isSignIn ? 'Войти' : ' Зарегистрироваться'}
						</button>
					</div>
				</form>
				{isSignIn && <p className="mt-3 text-center text-sm text-[gray-500]">Забыли пароль?</p>}
			</div>
		</div>
	);
}