import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api/axios';
import type { Post } from './postsSlice';

export const fetchPostsByUserId = createAsyncThunk<Post[], number>(
	'posts/fetchByUserId',
	async (userId, { rejectWithValue }) => {
		try {
			const res = await api.get(`http://localhost:5000/api/users/${userId}/posts`);
			console.log('posts:', res.data.posts);
			return res.data.posts as Post[];
		} catch (err: any) {
			
			return rejectWithValue(err.response?.data?.error || err.message);
		}
	}
);

export const fetchAllPosts = createAsyncThunk<Post[]>(
	'posts/fetchAll',
	async (_, { rejectWithValue }) => {
		try {
			const res = await api.get('http://localhost:5000/api/posts/fetchAll');
			console.log('Request URL:', res.config?.url);
			console.log('Fetched posts:', res.data.posts);	
			return res.data.posts as Post[];
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.error || err.message);
		}
	}
);

export const createPost = createAsyncThunk<
	Post,
	{ title: string; content: string; userId: number }
>('posts/create', async (payload, { rejectWithValue }) => {
	try {
		const res = await api.post('http://localhost:5000/api/posts', payload);
		return res.data as Post;
	} catch (err: any) {
		return rejectWithValue(err.response?.data?.error || err.message);
	}
});

export const deletePost = createAsyncThunk<number, number>(
	'posts/delete',
	async (id, { rejectWithValue }) => {
		try {
			await api.delete(`http://localhost:5000/api/posts/${id}`);
			return id;
		} catch (err: any) {
			return rejectWithValue(err.response?.data?.error || err.message);
		}
	}
);
