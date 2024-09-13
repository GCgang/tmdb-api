import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useInfiniteScroll<T>(
  queryKey: [string, string | undefined],
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<T[]>,
  enabled: boolean
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<T[]>({
    queryKey,
    queryFn: ({ pageParam = 1 }) => queryFn({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage, pages) =>
      lastPage.length ? pages.length + 1 : undefined,
    enabled,
    initialPageParam: 1,
  });

  useEffect(() => {
    if (isFetchingNextPage) return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      rootMargin: '100px',
    });

    const currentElement = lastElementRef.current;
    if (currentElement) {
      observerRef.current.observe(currentElement);
    }

    return () => {
      if (currentElement && observerRef.current) {
        observerRef.current.unobserve(currentElement);
      }
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return { data, lastElementRef, isLoading, error, isFetchingNextPage };
}
