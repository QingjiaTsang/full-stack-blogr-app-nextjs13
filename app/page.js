import Post from '@/components/Post';
import prisma from '@/lib/prisma';

const Blog = async (props) => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
  });

  console.log(`feed`, feed);

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
