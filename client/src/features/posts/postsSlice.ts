import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import {
	fetchPostsByUserId,
	fetchAllPosts,
	createPost,
	deletePost,
} from './postsApi';

export interface Post {
	id: number;
	title: string;
	content: string;
	userId: number;
	author?: { id: number; username: string };
}

interface PostsState {
	items: Post[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: PostsState = {
	items: [],
	status: 'idle',
	error: null,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPostsByUserId.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchPostsByUserId.fulfilled,
				(state, action: PayloadAction<Post[]>) => {
					state.status = 'succeeded';
					state.items = action.payload;
					state.error = null;
				}
			)
			.addCase(fetchPostsByUserId.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			})
			.addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
				state.items.unshift(action.payload);
			})
			.addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
				state.items = state.items.filter((p) => p.id !== action.payload);
			})
			.addCase(fetchAllPosts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchAllPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
				state.status = 'succeeded';
				state.items = action.payload;
				state.error = null;
			})
			.addCase(fetchAllPosts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsStatus = (state: RootState) => state.posts.status;
export const selectPostsError = (state: RootState) => state.posts.error;

export default postsSlice.reducer;
