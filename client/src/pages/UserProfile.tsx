import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Layout, Row, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchUserByUsername } from '../features/users/usersApi';
import { selectCurrentUser } from '../features/users/usersSlice';
import { PostList } from '../features/posts/components/PostList';
import { UserCard } from '../features/users/components/UserCard';

export const UserProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const loading = !user || user.username !== username;

  useEffect(() => {
    if (username && loading) {
      dispatch(fetchUserByUsername(username));
    }
  }, [dispatch, username, loading]);

  return (
    <Layout.Content style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>{loading ? <Spin /> : user && <UserCard user={user} />}</Col>
        <Col span={24}>
          <PostList />
        </Col>
      </Row>
    </Layout.Content>
  );
};