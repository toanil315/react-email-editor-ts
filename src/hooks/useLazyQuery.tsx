import { useCallback, useState } from 'react';
import {
  QueryFunction,
  QueryKey,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';

export function useLazyQuery<TData, TError>(
  key: QueryKey,
  fetchFn: QueryFunction<TData, QueryKey>,
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>,
): [() => void, UseQueryResult<unknown, unknown>] {
  const [enabled, setEnabled] = useState(false);

  const query = useQuery<TData, TError, TData, QueryKey>({
    queryKey: key,
    queryFn: fetchFn,
    ...options,
    enabled,
  });

  const trigger = useCallback(() => {
    if (!enabled) {
      setEnabled(true);
    }
  }, [fetchFn, enabled]);

  return [trigger, query];
}
