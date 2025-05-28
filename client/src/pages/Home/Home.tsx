import { useEffect } from 'react';
import { PostList } from '../../features/posts/components/PostList/PostList';
import { fetchAllPosts } from '../../features/posts/postsApi';
import { UsersRow } from '../../features/users/components/UsersRow/UsersRow';
import { useAppDispatch } from '../../hooks';

import styles from './Home.module.css';

export const Home: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllPosts());
	}, [dispatch]);

	return (
		<main className={styles.container}>
			<UsersRow />
			<PostList />
		</main>
	);
};
