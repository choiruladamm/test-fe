import { Header, HeaderMobile } from '@/components/header';
import { MarginWidthWrapper, PageWrapper } from '@/components/partials';
import SideBarNav from '@/components/sidebar/SideBarNav';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {}

const ProtectedRoute: FC<ProtectedRouteProps> = ({}) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return (
    <div className='flex'>
      <SideBarNav />
      <div className='flex-1'>
        <MarginWidthWrapper>
          <Header />
          <HeaderMobile />
          <PageWrapper>
            <Outlet />
          </PageWrapper>
        </MarginWidthWrapper>
      </div>
    </div>
  );
};

export default ProtectedRoute;
