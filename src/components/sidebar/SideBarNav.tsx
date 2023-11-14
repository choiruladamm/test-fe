import { SIDENAV_ITEMS } from '@/lib/constants';
import { Link } from 'react-router-dom';
import MenuItem from './MenuItem';
import { LogoutButton } from '../partials';

const SideBarNav = () => {
  return (
    <div className='fixed hidden h-screen flex-1 border-r border-zinc-200 bg-white md:flex md:w-60'>
      <div className='flex w-full flex-col space-y-6'>
        <Link
          to='/'
          className='flex h-12 w-full flex-row items-center justify-center space-x-3 border-b border-zinc-200 md:justify-start md:px-6'
        >
          <span className='h-8 w-8 rounded-full bg-slate-900' />
          <span className='hidden font-bold md:flex'>Logo</span>
        </Link>
        <div className='flex flex-col space-y-2 md:px-4 '>
          {SIDENAV_ITEMS.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
