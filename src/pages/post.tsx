import { FC } from 'react'

interface PostpageProps {
  
}

const Postpage: FC<PostpageProps> = ({}) => {
  return (
    <>
      <span className='text-4xl font-bold'>Post Page</span>
      <div className='h-12 w-full rounded-lg border border-dashed border-zinc-500'></div>
      <div className='h-64 w-full rounded-lg border border-dashed border-zinc-500'></div>
      <div className='h-64 w-full rounded-lg border border-dashed border-zinc-500'></div>
      <div className='h-64 w-full rounded-lg border border-dashed border-zinc-500'></div>
      <div className='h-64 w-full rounded-lg border border-dashed border-zinc-500'></div>
      <div className='h-64 w-full rounded-lg border border-dashed border-zinc-500'></div>
    </>
  );
}

export default Postpage