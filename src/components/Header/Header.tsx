import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../hook/hook';
import { MyRoutes } from '../../utils/constants';
import { logOut } from '../../redux/slices/auth/authSlice';

import s from './Header.module.css';
import { selectUserData } from '../../redux/slices/user/userSlice';

const Header: React.FC = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userData = useAppSelector(selectUserData)

  const handleLogout = () => {
    dispatch(logOut())
    navigate(MyRoutes.Login)
  }

  return (
    <header className={s.header}>
      <div>
        <span>{userData?.username}, </span>
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
