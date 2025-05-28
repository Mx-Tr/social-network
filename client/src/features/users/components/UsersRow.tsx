import { Avatar, List, Typography } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectUsersList } from '../usersSlice';
import { fetchAllUsers } from '../usersApi';

export const UsersRow: React.FC = () => {
	const dispatch = useAppDispatch();
	const users = useAppSelector(selectUsersList);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, [dispatch]);

	return (
		<List
			dataSource={users}
			split={false}
			style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: 24 }}
			renderItem={(u) => (
				<List.Item style={{ display: 'inline-block', marginRight: 16 }}>
					<Link to={`/user/${u.username}`}>
						<Avatar size={64}>{(u.username?.[0] || '?').toUpperCase()}</Avatar>
						<Typography.Text style={{ display: 'block', textAlign: 'center' }}>
							{u.username}
						</Typography.Text>
					</Link>
				</List.Item>
			)}
		/>
	);
};
