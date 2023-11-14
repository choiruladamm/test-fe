import { SideNavItem } from '@/types/sideNavItem';
import { Link } from 'react-router-dom';

const MenuItem = ({ item }: { item: SideNavItem }) => {
  return (
    <Link
      to={item.path}
      className={`flex flex-row items-center space-x-4 rounded-lg p-2 hover:bg-slate-900 hover:text-white`}
    >
      {item.icon}
      <span className='flex text-lg font-medium'>{item.title}</span>
    </Link>
  );
};

export default MenuItem;
