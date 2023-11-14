import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { FC, useState } from 'react';
import { Button } from '../ui/button';
import { ListProps } from '@/types/post';
import http from '@/lib/http';
import { toast } from '../ui/use-toast';

const Card: FC<ListProps> = ({
  id,
  caption,
  image,
  likes,
  tags,
  user,
  liked,
}) => {
  const [amILike, setAmILike] = useState(liked);
  const likeAction = ({ type }: { type: 'like' | 'unlike' }) => {
    http.put(`/post/${type}/${id}`).then(() => {
      setAmILike(!liked);
      toast({
        duration: 2000,
        title: `Successfully ${type} Post`,
      });
    });
  };
  return (
    <div className='bg-gray-100'>
      <div className='rounded-md border bg-white'>
        <div className='flex items-center px-4 py-1'>
          <img className='h-8 w-8 rounded-full' src={user?.photo} />
          <div className='ml-3 '>
            <span className='block text-sm font-semibold leading-tight antialiased'>
              {user?.username}
            </span>
          </div>
        </div>
        <img src={image} />
        <div className='mx-2 my-1 flex items-center gap-2'>
          {amILike ? (
            <Button
              onClick={() => likeAction({ type: 'unlike' })}
              size={'icon'}
              variant={'ghost'}
            >
              <HeartFilledIcon className='h-5 w-6 text-red-500' />
            </Button>
          ) : (
            <Button
              onClick={() => likeAction({ type: 'like' })}
              size={'icon'}
              variant={'ghost'}
            >
              <HeartIcon className='h-5 w-6' />
            </Button>
          )}
          <div className='text-sm font-semibold'>{likes} likes</div>
          <div className='text-sm font-semibold text-blue-500'>{tags}</div>
        </div>
        <div className='mx-4 mb-2 text-sm'>{caption}</div>
      </div>
    </div>
  );
};

export default Card;
