import { FC } from 'react';
import { Spin } from 'antd';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { EPageRoute } from '../types/enums/EPageRoute';


interface IProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: FC<IProtectedRouteProps> = ({
  children,
}) => {
  const { token } = window.localStorage;
  const isAuthenticated = token ? true : false;
  const { loading } = useAppSelector((state) => state.signIn);
 
  if (loading) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin spinning={loading} />
      </div>
    );
  }

  if (!isAuthenticated) {
    localStorage.clear();

    return (
      <Navigate to={EPageRoute.SIGN_IN_PAGE_ROUTE} />
    );
  }

  return children;
};
