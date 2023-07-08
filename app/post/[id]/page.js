'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';
import useUpdatePost from '@/hooks/useUpdatePost';
import { ArrowLeft } from 'lucide-react';

const Post = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { updatePost } = useUpdatePost();

  const fetcher = (url) => fetch(url).then((r) => r.json());
  const { data: post, isLoading } = useSWR(`/api/post/${params.id}`, fetcher);
  let { published, title, author, content, authorId } = post || {};
  if (!published) {
    title = `${title} (Draft)`;
  }

  const deletePost = async (backTo) => {
    try {
      const response = await fetch(`/api/post/${params.id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          authorId,
        }),
      });
      if (response.ok) {
        router.push(backTo);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  if (isLoading) return <div className='ml-8'>loading...</div>;
  return (
    <>
      <div className='absolute top-20 right-8 cursor-pointer'>
        <Button
          onClick={() => {
            published ? router.push('/') : router.push('/drafts');
          }}
          variant='link'
        >
          <ArrowLeft /> back
        </Button>
      </div>

      <div className='ml-8 mr-8 bg-white'>
        <div className='p-8'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <p className='pt-3 pb-3'>By {author?.name || 'Unknown author'}</p>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div className='flex mt-4 space-x-2 absolute right-8'>
          {!published && session?.user?.id === authorId && (
            <>
              <Button
                className='black_btn'
                onClick={() => updatePost(params.id, { published: true, authorId }, '/')}
              >
                publish
              </Button>
              <Button className='black_btn' onClick={() => router.push(`/post/${params.id}/edit`)}>
                edit
              </Button>
            </>
          )}
          {session?.user?.id === authorId && (
            <Button
              className='black_btn'
              onClick={() => {
                const answer = window.confirm('Are you sure you want to delete this post?');
                if (answer) {
                  deletePost(published ? '/' : '/drafts');
                }
              }}
            >
              delete
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;
