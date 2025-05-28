import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { selectCurrentUser } from '../../../users/usersSlice';
import { createPost } from '../../postsApi';

import styles from './PostForm.module.css';

interface PostFormProps {
	onClose?: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onClose }) => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectCurrentUser);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user || !title.trim() || !content.trim()) return;

		dispatch(createPost({ title, content, userId: user.id }));
		setTitle('');
		setContent('');
		if (onClose) onClose();
	};

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			<label className={styles.label}>
				Заголовок
				<input
					className={styles.input}
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Напишите заголовок"
					required
				/>
			</label>

			<label className={styles.label}>
				Текст
				<textarea
					className={styles.textarea}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Поделитесь мыслями..."
					rows={4}
					required
				/>
			</label>

			<div className={styles.buttons}>
				<button type="submit" className={styles.button} disabled={!user}>
					Опубликовать
				</button>
				{onClose && (
					<button
						type="button"
						className={styles.buttonCancel}
						onClick={onClose}
					>
						Отмена
					</button>
				)}
			</div>
		</form>
	);
};
