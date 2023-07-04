'use client';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

const Post = ({ post }) => {
  const router = useRouter();
  const authorName = post.author ? post.author.name : 'Unknown author';

  return (
    <div
      className='h-60 ml-8 mr-8 bg-white hover:shadow-lg'
      onClick={() => router.push(`/post/${post.id}`)}
    >
      <div className='pl-8 pt-10 text-2xl font-bold'>{post.title}</div>
      <div className='pl-8 pt-2'>
        <div className='text-sm pt-3 pb-3'>By {authorName}</div>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Post;
