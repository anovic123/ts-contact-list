import React from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../hook/hook';
import { logOut } from '../../redux/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import s from './Header.module.css';
import { MyRoutes } from '../../utils/constants';

const Header: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut())
    navigate(MyRoutes.Login)
  }

  return (
    <header className={s.header}>
      <div>
        <span>Пользователь, </span>
        <Button 
          type="primary" 
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Выход
        </Button>
      </div>
    </header>
  );
};

export default Header;
