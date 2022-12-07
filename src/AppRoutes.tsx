import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { useAppSelector } from './hook/hook';
import ContactList from './pages/ContactList/ContactList';
import Login from './pages/Login/Login';
import { selectIsLoggedIn } from './redux/slices/auth/authSlice';
import { MyRoutes } from './utils/constants';

const AppRoutes: React.FC = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return (
    <>
      { isLoggedIn && <Header /> }
      <Routes>
        <Route
          path={MyRoutes.Home}
          element={
            isLoggedIn ? <Navigate to={MyRoutes.Contacts} /> : <Navigate to={MyRoutes.Login} />
          }
        />
        <Route
          path={MyRoutes.Login}
          element={isLoggedIn ? <Navigate to={MyRoutes.Contacts} /> : <Login />}
        />
        <Route
          path={MyRoutes.Contacts}
          element={isLoggedIn ? <ContactList /> : <Navigate to={MyRoutes.Login} />}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
