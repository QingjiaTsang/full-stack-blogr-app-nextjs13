'use client';
import { useState, useEffect } from 'react';
import Post from '@/components/Post';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CreatePost = (props) => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');

  // todo： publish, save as draft 发请求去修改数据库
  return (
    <div>
      <div className='mb-4 ml-8 pt-3 text-4xl font-bold'>Create Post</div>
      <div className='ml-8 text-2xl font-bold'>Title</div>
      <div className='mb-4 ml-8 mr-8 bg-white'>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div className='ml-8 text-2xl font-bold'>Contents</div>
      <div className='h-60 mb-4 ml-8 mr-8 bg-white'>
        <Textarea className='h-[100%] bg-white' />
      </div>
      <div className='flex space-x-2 absolute right-8'>
        <div>
          <Button className='black_btn'>publish</Button>
        </div>
        <div>
          <Button className='black_btn'>save as draft</Button>
        </div>
        <div>
          <Button className='black_btn'>cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
