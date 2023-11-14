import { cn } from '@/lib/utils';
import useScroll from '@/hooks/useScoll';
import { Link } from 'react-router-dom';

const Header = () => {
  const scrolled = useScroll(5);

  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full border-b border-gray-200 transition-all`,
        {
          'border-b border-gray-200 bg-white/75 backdrop-blur-lg': scrolled,
        },
      )}
    >
      <div className='flex h-[47px] items-center justify-between px-4'>
        <div className='flex items-center space-x-4'>
          <Link
            to='/'
            className='flex flex-row items-center justify-center space-x-3 md:hidden'
          >
            <span className='h-8 w-8 rounded-full bg-slate-900' />
            <span className='flex text-lg font-bold '>Logo</span>
          </Link>
        </div>

        <div className='hidden md:block'>
          <div className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-center'>
            <span className='text-sm font-semibold text-white'>Ad</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
