import axios from 'axios';
import { Profile } from '../interfaces/profile.interface';
import { PREFIX } from '../helpers/API';

export const registerUser = async (userData: Profile) => {
	try {
		const response = await axios.post(`${PREFIX}Auth/register`, userData, {
			withCredentials: true 
		});
		return response.data;
	} catch (error: any) {
		console.error('Ошибка регистрации', error.response?.data || error.message);
		throw error.response?.data || error.message;
	}
};

export const loginUser = async (loginData: Profile) => {
	try {
		const response = await axios.post(`${PREFIX}Auth/login`, loginData, {
			withCredentials: true 
		});
		return response.data;
	} catch (error: any) {
		console.error('Ошибка авторизации', error.response?.data || error.message);
		throw error.response?.data || error.message;
	}
};
