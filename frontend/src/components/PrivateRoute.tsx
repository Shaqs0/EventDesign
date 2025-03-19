import Cookies from 'js-cookie';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children }: { children: JSX.Element }) {
	const token = Cookies.get('accessToken');

	if (!token) {
		return <Navigate to="/sign" />;
	}

	return children;
}
