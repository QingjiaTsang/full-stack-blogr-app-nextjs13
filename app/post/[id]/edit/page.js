'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import Post from '@/components/Post';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import useUpdatePost from '@/hooks/useUpdatePost';
// import { useRequest } from 'ahooks';

const EditPost = ({ params }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { data: session } = useSession();
  const router = useRouter();
  const { updatePost } = useUpdatePost();

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const {
    data: post,
    isLoading,
    mutate,
  } = useSWR(`/api/post/${params.id}`, fetcher, {
    onSuccess: (data) => {
      console.log(`data 123`, data);
      // todo: 为什么这里在一开始请求完成后，不会触发onSuccess回调执行下面的代码？（network看到了请求是有成功返回的）
      // setTitle(data.title);
      // setContent(data.content);
      // setAuthorId(data.authorId);
    },
  });

  console.log(`title 123`, title);
  console.log(`content 123`, content);
  console.log(`authorId 123`, authorId);

  // todo: ahooks似乎跟nextjs不兼容
  // const { run: edit, loading } = useRequest({
  //   url: `/api/post/${params.id}`,
  //   method: 'PATCH',
  //   // manual: true,
  //   onSuccess: (data) => {
  //     setTitle(data.title);
  //     setContent(data.content);
  //     setAuthorId(data.authorId);
  //   },
  // });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setAuthorId(post.authorId);
    }
  }, [post]);

  if (isLoading) return <div className='ml-8'>loading...</div>;
  // if (loading) return <div className='ml-8'>loading...</div>;

  return (
    <div>
      <div className='mb-4 ml-8 pt-3 text-4xl font-bold'>Create Post</div>
      <div className='ml-8 text-2xl font-bold'>Title</div>
      <div className='mb-4 ml-8 mr-8 bg-white'>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className='ml-8 text-2xl font-bold'>Content</div>
      <div className='h-60 ml-8 mr-8 bg-white'>
        <Textarea
          className='h-[100%] bg-white'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className='flex mt-4 space-x-2 absolute right-8'>
        <div>
          <Button
            className='black_btn'
            onClick={() =>
              updatePost(params.id, { title, content, published: true, authorId }, '/')
            }
          >
            publish
          </Button>
        </div>
        <div>
          <Button
            className='black_btn'
            onClick={() => updatePost(params.id, { title, content, authorId }, '/drafts')}
          >
            save as draft
          </Button>
        </div>
        <div>
          <Button className='black_btn'>cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
