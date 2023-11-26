import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

interface QueryContextProps {
  children: React.ReactNode;
}

function QueryContext({ children }: QueryContextProps) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: 'always',
            staleTime: 1000 * 60 * 1,
            retry: false,
          },
        },
      }),
    [],
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export default QueryContext;
