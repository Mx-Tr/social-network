import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectCurrentUser } from '../../../users/usersSlice';
import { deletePost, fetchPostsByUserId } from '../../postsApi';
import {
	selectPosts,
	selectPostsError,
	selectPostsStatus,
} from '../../postsSlice';
import styles from './PostList.module.css';

export const PostList: React.FC = () => {
	const dispatch = useAppDispatch();
	const posts = useAppSelector(selectPosts);
	const error = useAppSelector(selectPostsError);
	const status = useAppSelector(selectPostsStatus);
	const user = useAppSelector(selectCurrentUser);

	useEffect(() => {
		if (user?.id) {
			dispatch(fetchPostsByUserId(user.id));
		}
	}, [dispatch, user?.id]);

	if (status === 'loading')
		return <div className={styles.loading}>Загрузка...</div>;

	if (error) return <div className={styles.error}>Ошибка: {error}</div>;

	if (!posts.length) return <div className={styles.empty}>Постов пока нет</div>;

	return (
		<ul className={styles.list}>
			{posts.map((post) => (
				<li key={post.id} className={styles.card}>
					<div className={styles.header}>
						<h3 className={styles.title}>{post.title}</h3>
						<button
							className={styles.deleteButton}
							onClick={() => dispatch(deletePost(post.id))}
						>
							Удалить
						</button>
					</div>
					<p>{post.content}</p>
				</li>
			))}
		</ul>
	);
};
