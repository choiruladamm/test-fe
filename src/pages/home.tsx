import Card from '@/components/home/Card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import http from '@/lib/http';
import { ListProps } from '@/types/post';
import { parse } from 'path';
import { FC, FormEvent, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = ({}) => {
  const [listPost, setListPost] = useState<any>([]);
  const [paginationPost, setPaginationPost] = useState([]);

  const [query, setQuery] = useState('');
  const baseURL = 'https://devfortest.my.id'
  const getData = async () => {
    http.get(`/post?page=1&limit=8`).then((data) => {
      setListPost(data.data);
    });
  };

  const handleSearch = async ({
    type,
  }: {
    type: 'tag' | 'caption' | 'empty';
  }) => {
    const url = `${baseURL}/post?page=1&limit=8&search=${query}&searchBy=${type}`;
    http.get(url).then((data) => {
      if (data) {
        setListPost(data.data.data);
      } else {
        setListPost([]);
      }
    });
  };

  useEffect(() => {
    if (!query) {
      getData();
    }
  }, [query]);

  return (
    <>
      <Popover open={!!query}>
        <PopoverTrigger>
          <Input
            onChange={(e) => setQuery(e.target.value)}
            className='bg-white'
            placeholder='Search by tag or caption'
          />
          <button type='submit'></button>
        </PopoverTrigger>
        <PopoverContent>
          <div
            className='cursor-pointer'
            onClick={() => handleSearch({ type: 'caption' })}
          >
            <p>by Caption : {query}</p>
          </div>
          <hr />
          <div
            className='cursor-pointer'
            onClick={() => handleSearch({ type: 'tag' })}
          >
            <p>by Tags:# {query}</p>
          </div>
        </PopoverContent>
      </Popover>
      <div className='grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {listPost && listPost.data && listPost.data.length ? (
          <>
            {listPost.data.map((post: any, idx: number) => (
              <Card
                key={idx}
                id={post.id}
                liked={post.liked}
                user={post.user}
                image={post.image}
                likes={post.likes}
                tags={post.tags}
                caption={post.caption}
              />
            ))}
            <Pagination listPost={listPost} setListPost={setListPost} />
          </>
        ) : (
          <>No Data Available</>
        )}
        {/* {listPost && listPost.data.length ? (
          <>
            {listPost.data.map((post: any, idx: number) => (
              <Card
                key={idx}
                id={post.id}
                liked={post.liked}
                user={post.user}
                image={post.image}
                likes={post.likes}
                tags={post.tags}
                caption={post.caption}
              />
            ))}
          </>
        ) : (
          <>No Data Available</>
        )} */}
      </div>
    </>
  );
};

const Pagination = (props: any) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + parseInt(props.listPost.pagination.limit);
  const pageCount = Math.ceil(
    parseInt(props.listPost.pagination.total) /
      parseInt(props.listPost.pagination.limit),
  );
  const handlePageClick = (event: any) => {
    const currentPage = parseInt(props.listPost.pagination.page);
    const limit = parseInt(props.listPost.pagination.limit);
    http.get(`/post?page=${event.selected + 1}&limit=${limit}`).then((data) => {
      props.setListPost(data.data);
    });
  };
  return (
    <ReactPaginate
      breakLabel='...'
      nextLabel='next >'
      activeClassName='bg-blue-500'
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel='< previous'
      renderOnZeroPageCount={null}
    />
  );
};

export default HomePage;
