'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Post from '@/components/Post';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CreatePost = (props) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const createPost = async (published) => {
    try {
      const response = await fetch('/api/post/new', {
        method: 'POST',
        body: JSON.stringify({
          title,
          content,
          published,
          authorId: session.user.id,
        }),
      });
      if (response.ok) {
        router.push('/');
      }
    } catch (e) {
      console.log(`error`, e);
    }
  };

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
          <Button className='black_btn' onClick={() => createPost(true)}>
            publish
          </Button>
        </div>
        <div>
          <Button className='black_btn' onClick={() => createPost(false)}>
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

export default CreatePost;
