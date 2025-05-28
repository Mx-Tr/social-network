import { Card, Typography } from 'antd';
import type { User } from '../usersSlice';

export const UserCard: React.FC<{ user: User }> = ({ user }) => (
  <Card>
    <Typography.Title level={4}>{user.username}</Typography.Title>
    <Typography.Text type="secondary">{user.email}</Typography.Text>
  </Card>
);