import { FC, useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SideBarNav from './components/sidebar/SideBarNav';
import { Header, HeaderMobile } from './components/header';
import { MarginWidthWrapper, PageWrapper } from './components/partials';
import {
  ChangePasswordPage,
  HomePage,
  LoginPage,
  PostPage,
  RegisterPage,
  UserPage,
} from './pages';

interface RootRouterProps {}

const RootRouter: FC<RootRouterProps> = ({}) => {
  return (

    <div className='flex'>
      {/* <SideBarNav /> */}
      {/* <div className='flex-1'> */}
        {/* <MarginWidthWrapper> */}
          {/* <Header /> */}
          {/* <HeaderMobile /> */}
          {/* <PageWrapper> */}
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/' element={<HomePage />} />
              <Route path='/user' element={<UserPage />} />
              <Route path='/post' element={<PostPage />} />
              <Route path='/change-password' element={<ChangePasswordPage />} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          {/* </PageWrapper> */}
        {/* </MarginWidthWrapper> */}
       </div>
    // </div>
  );
};

export default RootRouter;
