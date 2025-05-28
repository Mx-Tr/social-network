import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axios';
import type { User } from './usersSlice';

export const fetchUserByUsername = createAsyncThunk<User, string>(
	'users/fetchByUsername',
	async (username, { rejectWithValue }) => {
		try {
			const res = await api.get('http://localhost:5000/api/users', { params: { username } });
			return res.data as User;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.error || err.message);
		}
	}
);

export const fetchAllUsers = createAsyncThunk<User[]>(
	'users/fetchAll',
	async (_, { rejectWithValue }) => {
		try {
			const res = await api.get('http://localhost:5000/api/users/all');
			return res.data as User[];
		} catch (err: any) {
			console.log('Error fetching users:', err);
			return rejectWithValue(err.response?.data?.error || err.message);
		}
	}
);

export const createUser = createAsyncThunk<
	User,
	{ username: string; email: string; password: string }
>('users/create', async (payload, { rejectWithValue }) => {
	try {
		const res = await api.post('http://localhost:5000/api/users', payload);
		return res.data as User;
	} catch (err: any) {
		return rejectWithValue(err.response?.data?.error || err.message);
	}
});
