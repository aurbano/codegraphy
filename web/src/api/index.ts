/**
 * Generated by orval v6.20.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import { useQuery } from '@tanstack/react-query';
import type {
  QueryFunction,
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import * as axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  ApiRoot,
  GraphModel,
  HTTPValidationError,
  ReadGraphApiGraphsGetParams,
} from './schema';

/**
 * @summary Read Root
 */
export const readRootApiGet = (options?: AxiosRequestConfig): Promise<AxiosResponse<ApiRoot>> => {
  return axios.default.get(`http://127.0.0.1:8000/api/`, options);
};

export const getReadRootApiGetQueryKey = () => {
  return [`http://127.0.0.1:8000/api/`] as const;
};

export const getReadRootApiGetQueryOptions = <
  TData = Awaited<ReturnType<typeof readRootApiGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof readRootApiGet>>, TError, TData>>;
  axios?: AxiosRequestConfig;
}) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getReadRootApiGetQueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof readRootApiGet>>> = ({ signal }) =>
    readRootApiGet({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof readRootApiGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ReadRootApiGetQueryResult = NonNullable<Awaited<ReturnType<typeof readRootApiGet>>>;
export type ReadRootApiGetQueryError = AxiosError<unknown>;

/**
 * @summary Read Root
 */
export const useReadRootApiGet = <
  TData = Awaited<ReturnType<typeof readRootApiGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<UseQueryOptions<Awaited<ReturnType<typeof readRootApiGet>>, TError, TData>>;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getReadRootApiGetQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Read Graph
 */
export const readGraphApiGraphsGet = (
  params: ReadGraphApiGraphsGetParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<GraphModel>> => {
  return axios.default.get(`http://127.0.0.1:8000/api/graphs/`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getReadGraphApiGraphsGetQueryKey = (params: ReadGraphApiGraphsGetParams) => {
  return [`http://127.0.0.1:8000/api/graphs/`, ...(params ? [params] : [])] as const;
};

export const getReadGraphApiGraphsGetQueryOptions = <
  TData = Awaited<ReturnType<typeof readGraphApiGraphsGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: ReadGraphApiGraphsGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof readGraphApiGraphsGet>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getReadGraphApiGraphsGetQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof readGraphApiGraphsGet>>> = ({ signal }) =>
    readGraphApiGraphsGet(params, { signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof readGraphApiGraphsGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ReadGraphApiGraphsGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof readGraphApiGraphsGet>>
>;
export type ReadGraphApiGraphsGetQueryError = AxiosError<HTTPValidationError>;

/**
 * @summary Read Graph
 */
export const useReadGraphApiGraphsGet = <
  TData = Awaited<ReturnType<typeof readGraphApiGraphsGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: ReadGraphApiGraphsGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof readGraphApiGraphsGet>>, TError, TData>
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getReadGraphApiGraphsGetQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryOptions.queryKey;

  return query;
};
