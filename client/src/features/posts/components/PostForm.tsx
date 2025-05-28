import { Form, Input, Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { createPost } from '../postsApi';
import { selectCurrentUser } from '../../users/usersSlice'; 

export const PostForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const onFinish = (values: { title: string; content: string }) => {
    if (!user) return;
    dispatch(createPost({ ...values, userId: user.id }));
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ marginBottom: 24 }}>
      <Form.Item name="title" label="Заголовок" rules={[{ required: true, message: 'Введите заголовок' }]}>
        <Input placeholder="Напишите заголовок" />
      </Form.Item>
      <Form.Item name="content" label="Текст" rules={[{ required: true, message: 'Введите текст' }]}>
        <Input.TextArea rows={4} placeholder="Поделитесь мыслями..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={!user}>
          Опубликовать
        </Button>
      </Form.Item>
    </Form>
  );
};
