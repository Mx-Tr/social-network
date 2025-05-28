import type { User } from '../../usersSlice';
import styles from './UserCard.module.css';

interface UserCardProps {
	user: User;
	onCreatePostClick: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
	user,
	onCreatePostClick,
}) => (
	<div className={styles.card}>
		<h3 className={styles.username}>{user.username}</h3>
		<p className={styles.email}>{user.email}</p>
		<button className={styles.button} onClick={onCreatePostClick} type="button">
			Создать пост
		</button>
	</div>
);
