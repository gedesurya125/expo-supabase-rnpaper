import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { fetchBc, FetchBcProps } from './fetchBc';

export const useFetchBc = <TData>(props: FetchBcHookProps) => {
  const { token } = useBusinessCentralContext();

  const { queryKey } = props;
  return useQuery({
    queryKey,
    queryFn: async () =>
      await fetchBc<TData>({
        token,
        ...props.fetchProps
      })
  });
};

export type FetchBcHookProps = {
  queryKey: string[];
  fetchProps: Omit<FetchBcProps, 'token'>;
};

export const usePaginatedFetchBc = <TData extends { value?: any }>({
  queryKey,
  endPoint,
  pageSize
}: PaginatedFetchBcHookProps) => {
  const { token } = useBusinessCentralContext();
  const initialPage = 1;

  return useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = initialPage }) =>
      await fetchBc<TData>({
        token,
        endPoint: `${endPoint}?$top=${pageSize}&$skip=${(Number(pageParam) - 1) * pageSize}`
      }),
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage || lastPage?.value?.length < pageSize) return;
      return (pages.length + 1).toString();
    },
    initialPageParam: initialPage.toString()
  });
};

export type PaginatedFetchBcHookProps = {
  queryKey: string[];
  endPoint: string;
  pageSize: number;
};
