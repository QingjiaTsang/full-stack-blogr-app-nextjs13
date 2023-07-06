import Post from '@/components/Post';
import Image from 'next/image';
import Link from 'next/link';
import prisma from '@/lib/prisma';

const createPost = async () => {
  await prisma.post.create({
    data: {
      title: 'test',
      content: 'this is a test!',
      published: true,
      // 应该传入一个user的id，而不是给author字段传一个user的对象
      authorId: 'cljo73yha0000ty8gocrjmq14',
    },
  });
};

const Blog = async (props) => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
  });
  const users = await prisma.user.findMany();
  console.log(`users`, users);
  // await createPost();
  // console.log(`feed`, feed);

  return (
    <div>
      <div className='mb-4 ml-8 pt-3 text-4xl font-bold'>Public Feed</div>
      <div>
        {feed.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Blog;
