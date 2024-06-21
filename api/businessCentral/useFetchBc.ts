import { useQuery } from '@tanstack/react-query';
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
