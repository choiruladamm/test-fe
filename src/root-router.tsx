import { FC } from 'react';
import { Route, Router, Routes } from 'react-router-dom';
import { ChangePasswordPage, HomePage, LoginPage, PostPage, RegisterPage, UserPage } from './pages';
import { AfterLoggedIn, ProtectedRoute } from './hooks';
import SideBarNav from './components/sidebar/SideBarNav';
import { MarginWidthWrapper, PageWrapper } from './components/partials';
import { Header, HeaderMobile } from './components/header';

interface RootRouterProps {}

const RootRouter: FC<RootRouterProps> = ({}) => {
  return (
    <>
      <Routes>
        <Route element={<AfterLoggedIn />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/user' element={<UserPage />} />
          <Route path='/post' element={<PostPage />} />
          <Route path='/change-password' element={<ChangePasswordPage />} />
          <Route path='*' element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default RootRouter;
