import ReactMarkdown from 'react-markdown';
import prisma from '@/lib/prisma';

const Post = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: { id: String(params.id) },
    include: { author: { select: { name: true } } },
  });

  // console.log(`post`, post);

  let { published, title, author, content } = post;
  if (!published) {
    title = `${title} (Draft)`;
  }

  return (
    <div className='ml-8 mr-8 bg-white'>
      <div className='p-8'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p className='pt-3 pb-3'>By {author?.name || 'Unknown author'}</p>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Post;
