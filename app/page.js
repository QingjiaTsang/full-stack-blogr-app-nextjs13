import Post from '@/components/Post';
import Image from 'next/image';
import Link from 'next/link';

const feed = [
  {
    id: '1',
    title: 'Prisma is the perfect ORM for Next.js',
    content: '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
    published: false,
    author: {
      name: 'Nikolas Burk',
      email: 'burk@prisma.io',
    },
  },
];

const Blog = (props) => {
  return (
    <div>
      <div className='mb-4 ml-8 pt-3 text-4xl font-bold'>Public Feed</div>
      <div>
        {feed.map((post) => {
          return (
            <div key={post.id}>
              <Post post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
