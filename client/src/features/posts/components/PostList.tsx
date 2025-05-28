import { List, Card, Spin, Typography, Popconfirm, Button } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { deletePost, fetchPostsByUserId } from '../postsApi';
import {
	selectPosts,
	selectPostsStatus,
	selectPostsError,
} from '../postsSlice';
import { selectCurrentUser } from '../../users/usersSlice';

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

	if (status === 'loading') return <Spin />;
	if (!posts.length) {
		return (
			<Card style={{ width: '100%' }}>
				<Typography.Text type="secondary">Постов пока нет</Typography.Text>
			</Card>
		);
	}
	if (error)
		return (
			<Card style={{ width: '100%' }}>
				<Typography.Text type="danger">Ошибка: {error}</Typography.Text>;
			</Card>
		);

	return (
		<List
			grid={{ gutter: 16, column: 1 }}
			dataSource={posts}
			renderItem={(post) => (
				<List.Item>
					<Card
						title={post.title}
						extra={
							<Popconfirm
								title="Удалить пост?"
								onConfirm={() => dispatch(deletePost(post.id))}
								okText="Да"
								cancelText="Нет"
							>
								<Button type="link" danger>
									Удалить
								</Button>
							</Popconfirm>
						}
					>
						{post.content}
					</Card>
				</List.Item>
			)}
		/>
	);
};
