import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { SettingsPage, SignPage } from './pages';
import { EventsPage } from './pages/EventsPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ReportsPage } from './pages/ReportsPage';


const router = createBrowserRouter ([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{
				path: '/',
				element: <EventsPage/>
			},
			{
				path: '/favorites',
				element: <FavoritesPage/>
			},
			{
				path: '/reports',
				element: <ReportsPage/>
			},
			{
				path: '/settings',
				element: <SettingsPage/>
			}
		]
	},
	{
		path: '/sign',
		element: <SignPage/>
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router}/>
	</StrictMode>,
);
