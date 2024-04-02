import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage/HomePage';
import AnimalsPage from './pages/Animals/Animals';
import OrganizationsPage from './pages/Organizations';
import AnimalDetailsPage from './pages/AnimalDetails/AnimalDetails';
import { loader as rootLoader } from './pages/Root';
import AuthContextProvider from './store/auth-context';
import ErrorPage from './pages/Error/Error';
import { loader as animalsLoader } from './pages/Animals/Animals';
import Login, { loader as authLoader } from './pages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();
const App = () => {
  const Router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      loader: rootLoader,
      errorElement: <ErrorPage />,
      children: [{
        index: true,
        element: <HomePage />,
      }, {
        path: 'animals',
        element: <AnimalsPage />,
        loader: animalsLoader,
        children: [{
          path: ':animalId',
          element: <AnimalDetailsPage />
        }]
      }, {
        path: 'organizations',
        element: <OrganizationsPage />
      }]
    },
    {
      path: 'login',
      element: <Login />,
      loader: authLoader
    }
  ])
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={Router} />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App