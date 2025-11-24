

import axios from 'axios';

const API_URL = 'https://api.yahshuaexam.online';

export const todoService = {
	listTasks: async () => {
		const res = await axios.get(`${API_URL}/tasks/`);
		return res.data;
	},

	createTask: async (data: { title: string; description: string }) => {
		const res = await axios.post(`${API_URL}/tasks/`, data);
		return res.data;
	},

	getTask: async (id: string | number) => {
		const res = await axios.get(`${API_URL}/tasks/${id}/`);
		return res.data;
	},

	updateTask: async (id: string | number, data: { title: string; description: string }) => {
		const res = await axios.put(`${API_URL}/tasks/${id}/`, data);
		return res.data;
	},

	toggleCompleted: async (id: string | number, completed: boolean) => {
		const res = await axios.patch(`${API_URL}/tasks/${id}/`, { completed });
		return res.data;
	},

	deleteTask: async (id: string | number) => {
		const res = await axios.delete(`${API_URL}/tasks/${id}/`);
		return res.status === 204;
	}
}