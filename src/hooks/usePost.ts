import { useLoading } from './useLoading';

export const usePost = <T> (
  exec: (values: T) => Promise<void>,
) => {
  const { loading, setLoading } = useLoading();

  const post = async (values: T) => {
    setLoading(true);
    const res = await exec(values);
    setLoading(false);
    return res;
  };

  return {
    loading,
    post,
  };
};
