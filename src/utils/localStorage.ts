import { JsonPropsArray } from '../interfaces/globalInterfaces';

export const addDataToLocalStorage = <T>(name: string, data: T) => {
	localStorage.setItem(name, JSON.stringify(data));
};

export const removeDataFromLocalStorage = (name: string) => {
	localStorage.removeItem(name);
};
export const getDataFromLocalStorage = (name: string) => {
	const result = localStorage.getItem(name);
	const data = result ? JSON.parse(result) : [];
	return data;
};

export const dataFromLocalStorageAdmin = (): JsonPropsArray => {
	const data = getDataFromLocalStorage('cardItems');
	return data;
};

export const dataFromLocalStorage = (json: JsonPropsArray): JsonPropsArray => {
	let data = getDataFromLocalStorage('cardItems');

	if (data.length < 1) {
		addDataToLocalStorage<JsonPropsArray>('cardItems', json);
	}
	data = getDataFromLocalStorage('cardItems');
	return data;
};
