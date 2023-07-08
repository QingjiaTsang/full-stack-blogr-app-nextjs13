import { useRouter } from 'next/navigation';

const useUpdatePost = () => {
  const router = useRouter();
  const updatePost = async (id, payload, backTo) => {
    try {
      const response = await fetch(`/api/post/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ ...payload }),
      });
      if (response.ok) {
        router.push(backTo);
      }
    } catch (error) {
      console.log(`error`, error);
    }
  };

  return { updatePost };
};

export default useUpdatePost;
