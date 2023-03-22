import React, { useEffect, useState } from 'react';
interface LoadingWrapperProps<T> {
  loadData: () => Promise<T>;
  renderData: (data: T) => React.ReactNode;
}

export default function LoadingWrapper<T>({
  loadData,
  renderData,
}: LoadingWrapperProps<T>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const handleAsyncFunction = async () => {
      setIsLoading(true);
      try {
        const result = await loadData();
        setData(result);
      } catch (err) {
        setError(err as string);
      } finally {
        setIsLoading(false);
      }
    };
    handleAsyncFunction();
  }, []);
  return (
    <>
      {isLoading && <div>loadingComponent</div>}
      {error && <div>ErrorComponent</div>}
      {data && renderData(data)}
    </>
  );
}
