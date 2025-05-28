import { Col, Layout, Row } from 'antd';
import { useEffect } from 'react';
import { PostList } from '../features/posts/components/PostList';
import { fetchAllPosts } from '../features/posts/postsApi';
import { UsersRow } from '../features/users/components/UsersRow';
import { useAppDispatch } from '../hooks';

export const Home: React.FC = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllPosts());
	}, [dispatch]);

	return (
		<Layout.Content style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
			<Row gutter={[0, 24]}>
				<Col span={24}>
					<div style={{ width: '100%' }}>
						<UsersRow />
					</div>
				</Col>

				<Col span={24}>
					<div style={{ width: '100%' }}>
						<PostList />
					</div>
				</Col>
			</Row>
		</Layout.Content>
	);
};
