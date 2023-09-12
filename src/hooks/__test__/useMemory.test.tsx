import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';

import { useMemory } from '../useMemory';
import { mockedData } from '../__mocks__/mockedData';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
describe('useMemory', () => {
  it('should fetch and return memory data', async () => {

    const { result, waitForNextUpdate } = renderHook(() => useMemory(1), {
      wrapper,
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toBe(undefined)
    expect(result.current.status).toBe('loading');

    await waitForNextUpdate();

    // Verificar los valores de retorno del hook
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.data).toEqual(mockedData);
    expect(result.current.status).toBe('success');
  });

});

   