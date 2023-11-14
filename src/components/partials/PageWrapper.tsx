import { FC } from 'react'

interface PageWrapperProps {
  children: React.ReactNode
}

const PageWrapper: FC<PageWrapperProps> = ({children}) => {
  return (
    <div className='flex flex-grow flex-col space-y-2 px-4 pb-4 pt-2'>
      {children}
    </div>
  );
}

export default PageWrapper