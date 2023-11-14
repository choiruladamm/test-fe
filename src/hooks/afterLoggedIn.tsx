import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface afterLoggedInProps {}

const afterLoggedIn: FC<afterLoggedInProps> = ({}) => {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
};

export default afterLoggedIn;
