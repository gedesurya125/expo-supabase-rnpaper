import { useQuery } from '@tanstack/react-query';
import { useBusinessCentralContext } from './context/BusinessCentralContext';
import { fetchBcOData, FetchBcODataProps } from './fetchBcOData';

export const useFetchBcOData = <TData>(props: FetchBcHookProps) => {
  const { token } = useBusinessCentralContext();

  const { queryKey } = props;
  return useQuery({
    queryKey,
    queryFn: async () =>
      await fetchBcOData<TData>({
        token,
        ...props.fetchProps
      })
  });
};
export type FetchBcHookProps = {
  queryKey: string[];
  fetchProps: Omit<FetchBcODataProps, 'token'>;
};
