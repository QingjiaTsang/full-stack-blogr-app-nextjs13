import Post from '@/components/Post';
import prisma from '@/lib/prisma';

const Drafts = async (props) => {
  const drafts = await prisma.post.findMany({
    where: { published: false },
    include: { author: { select: { name: true } } },
  });

  return (
    <div>
      <div className='mb-4 ml-8 pt-3 text-4xl font-bold'>Drafts</div>
      <div>
        {drafts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Drafts;
