import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { EventsPage, FavoritePage, ReportsPage, SettingsPage, SignPage } from './pages';
import { PrivateRoute } from './components';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <PrivateRoute><EventsPage /></PrivateRoute>, 
			},
			{
				path: '/favorites',
				element: <PrivateRoute><FavoritePage /></PrivateRoute>, 
			},
			{
				path: '/reports',
				element: <PrivateRoute><ReportsPage /></PrivateRoute>, 
			},
			{
				path: '/settings',
				element: <PrivateRoute><SettingsPage /></PrivateRoute>, 
			},
		],
	},
	{
		path: '/sign',
		element: <SignPage />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
