import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { EventsPage, FavoritePage, ReportsPage, SettingsPage, SignPage } from './pages';

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
				element: <FavoritePage/>
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
