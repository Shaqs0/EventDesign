import axios from 'axios';
import { Profile } from '../interfaces/profile.interface';
import { PREFIX } from '../helpers/API';

export const registerUser = async (userData: Profile) => {
	try {
		const response = await axios.post(`${PREFIX}Auth/register`, userData);
		return response.data;
	} catch (error) {
		console.error('Ошибка регистрации', error);
		throw error;
	}
};

export const loginUser = async (loginData: Profile) => {
	try {
		const response = await axios.post(`${PREFIX}api/login`, loginData);
		return response.data;
	} catch (error) {
		console.error('Ошибка авторизации', error);
		throw error;
	}
};
