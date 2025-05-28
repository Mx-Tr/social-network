import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostForm } from '../../features/posts/components/PostForm/PostForm';
import { PostList } from '../../features/posts/components/PostList/PostList';
import { UserCard } from '../../features/users/components/UserCard/UserCard';
import { fetchUserByUsername } from '../../features/users/usersApi';
import { selectCurrentUser } from '../../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

import styles from './UserProfile.module.css';

export const UserProfile: React.FC = () => {
	const { username } = useParams<{ username: string }>();
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);

	const [showPostForm, setShowPostForm] = useState(false);

	const loading = !user || user.username !== username;

	useEffect(() => {
		if (username && loading) {
			dispatch(fetchUserByUsername(username));
		}
	}, [dispatch, username, loading]);

	const handleCreatePostClick = () => {
		setShowPostForm(true);
	};

	const handleClosePostForm = () => {
		setShowPostForm(false);
	};

	return (
		<main className={styles.container}>
			{loading && <div className={styles.loading}>Загрузка...</div>}

			{!loading && user && (
				<>
					<UserCard user={user} onCreatePostClick={handleCreatePostClick} />
					{showPostForm && <PostForm onClose={handleClosePostForm} />}
					<PostList />
				</>
			)}
		</main>
	);
};
