import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { fetchAllUsers } from '../../usersApi';
import { selectUsersList } from '../../usersSlice';

import styles from './UsersRow.module.css';

export const UsersRow: React.FC = () => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUsersList);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch]);

	return (
		<div className={styles.container}>
			{users.map((u) => (
				<Link to={`/user/${u.username}`} key={u.id} className={styles.userCard}>
					<div className={styles.avatar}>
						{(u.username?.[0] || '?').toUpperCase()}
					</div>
					<div className={styles.username}>{u.username}</div>
				</Link>
			))}
		</div>
	);
};
