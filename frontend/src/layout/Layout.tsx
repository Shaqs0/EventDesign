import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogoBlack, LogoWhite } from '../assets';

export function Layout () {
	const location = useLocation();
	const isLightTheme = localStorage.getItem('theme') === 'dark';

	return (
		<div className=''>
			<header className='flex items-center justify-around border-b border-[#D8D8D8] py-8 dark:border-[#000000] dark:bg-[white]  dark:text-[black]'>
				<div className='flex gap-3'>
					<img src={!isLightTheme ? LogoWhite : LogoBlack} className='h-[30px] w-[49px]'/>
					<p className='text-2xl font-semibold'>EventDesign</p>
				</div>
				<div className="flex items-center">
					<ul className="mr-9 hidden cursor-pointer gap-9 text-sm font-semibold md:flex lg:gap-16">
						<Link to="/" className={location.pathname === '/' ? 'link-text dark:text-[link-text-light]' : ''}>
							Мероприятия
						</Link>
						<Link to="/favorites" className={location.pathname === '/favorites' ? 'link-text dark:text-[link-text-light]' : ''}>
							Избранное
						</Link>
						<Link to="/reports" className={location.pathname === '/reports' ? 'link-text dark:text-[link-text-light]' : ''}>
							Отчеты
						</Link>
						<Link to="/settings" className={location.pathname === '/settings' ? 'link-text dark:text-[link-text-light]' : ''}>
							Настройки
						</Link>
					</ul>
				</div>
			</header>
			<main className='mt-10 grow dark:bg-[white]'>
				<Outlet/>
			</main>

		</div>
	);
}