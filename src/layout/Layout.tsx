import { Link, Outlet, useLocation } from 'react-router-dom';
import { LogoWhite } from '../assets';

export function Layout () {
	const location = useLocation();

	return (
		<div>
			<header className='flex items-center justify-around border-b border-[#D8D8D8] py-8'>
				<div className='flex gap-3'>
					<img src={LogoWhite} className='h-[30px] w-[49px]'/>
					<p className='text-2xl font-semibold'>EventDesign</p>
				</div>
				<div className="flex items-center">
					<ul className="mr-9 hidden cursor-pointer gap-9 text-sm font-semibold md:flex lg:gap-16">
						<Link to="/" className={location.pathname === '/' ? 'link-text' : ''}>
							Мероприятия
						</Link>
						<Link to="/favorites" className={location.pathname === '/favorites' ? 'link-text' : ''}>
							Избранное
						</Link>
						<Link to="/reports" className={location.pathname === '/reports' ? 'link-text' : ''}>
							Отчеты
						</Link>
						<Link to="/settings" className={location.pathname === '/settings' ? 'link-text' : ''}>
							Настройки
						</Link>
					</ul>
				</div>
			</header>
			<main className='mt-10 flex'>
				<Outlet/>
			</main>
			<footer>
                
			</footer>
		</div>
	);
}