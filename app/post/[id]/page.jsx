import ReactMarkdown from 'react-markdown';

const post = {
  id: '1',
  title: 'Prisma is the perfect ORM for Next.js',
  content: '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!',
  published: false,
  author: {
    name: 'Nikolas Burk',
    email: 'burk@prisma.io',
  },
};

const Post = ({ params }) => {
  const { id } = params;
  let { published, title, author, content } = post;
  if (!published) {
    title = `${title} (Draft)`;
  }

  return (
    <div className='h-60 ml-8 mr-8 bg-white'>
      <div className='pl-8 pt-10'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <p className='pt-3 pb-3'>By {author?.name || 'Unknown author'}</p>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Post;
