const BASE_URL = 'http://localhost:5000/api';

export const httpClient = (url, method = 'GET', data) => {

	return fetch(`${BASE_URL}${url}`, {
		method,
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
			'Content-Type': 'application/json; charset=UTF-8',
		},
	}).then((res) => res.json());
};
