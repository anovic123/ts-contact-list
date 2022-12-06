import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hook/hook';
import { logIn } from '../../redux/slices/auth/authSlice';
import { MyRoutes, USERS_URL } from '../../utils/constants';
import './Login.css';

const { Title } = Typography;

type LoginValues = {
  userName: string;
};

type UserItem = {
  name: string;
  username: string;
  email: string;
  avatar: string;
  id: string;
};

const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const onFinish = async ({ userName }: LoginValues) => {
    setIsLoading(true);

    const response = await fetch(USERS_URL);
    const userList: UserItem[] = await response.json();

    const foundUser = userList.find((user) => user.username === userName);

    if (!foundUser) {
      setError('Такого пользователя не существует');
    } else {
      setError('');
      dispatch(logIn)
      // navigate(MyRoutes.Contacts);
    }

    setIsLoading(false);
    console.log('foundUser', foundUser);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ userName: '', password: '' }}
      onFinish={onFinish}
    >
      <Title>Авторизация</Title>
      <Form.Item
        name="userName"
        rules={[{ required: true, message: 'Пожалуйста введите ваш логин!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Логин" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Пожалуйста введите ваш пароль!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" className="login-form-button">
          Вход
        </Button>
      </Form.Item>

      {error && <Alert message="Такого пользователя не существует" type="error" />}
    </Form>
  );
};

export default Login;
