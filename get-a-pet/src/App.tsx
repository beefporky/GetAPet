import { RouteObject, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from './store/auth-context';
import { queryClient } from './utils/utils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { routesConfig } from './routes';

// TODO: create unit tests
const Router = createBrowserRouter(routesConfig as RouteObject[])
const App = () => {
  // eslint-disable-next-line no-unused-vars
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={Router} />
      </AuthContextProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App