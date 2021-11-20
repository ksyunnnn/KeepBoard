import { useState } from 'react';

export const useLoading = (init = false) => {
  const [loading, setLoading] = useState<boolean>(init);

  return {
    loading,
    setLoading,
  };
};
