import { FC } from 'react'

interface MarginWidthWrapperProps {
  children: React.ReactNode
}

const MarginWidthWrapper: FC<MarginWidthWrapperProps> = ({children}) => {
  return (
    <div className='flex min-h-screen flex-col sm:border-r sm:border-zinc-700 md:ml-60'>
      {children}
    </div>
  );
}

export default MarginWidthWrapper