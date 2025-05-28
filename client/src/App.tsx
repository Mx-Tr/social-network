import { Layout } from 'antd';
import { AppRouter } from './router';
import { Link } from 'react-router-dom'; // добавьте импорт

export const App: React.FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Layout.Header style={{ color: '#fff', fontSize: 20 }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
        Basic Social Network
      </Link>
    </Layout.Header>
    <AppRouter />
  </Layout>
);