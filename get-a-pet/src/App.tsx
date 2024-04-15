import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage/HomePage';
import AnimalsPage from './pages/Animals/Animals';
import OrganizationsPage from './pages/Organizations';
import AnimalDetailsPage, { loader as animalDetailsLoader } from './pages/AnimalDetails/AnimalDetails';
import AuthContextProvider from './store/auth-context';
import ErrorPage from './pages/Error/Error';
import { loader as animalsLoader } from './pages/Animals/Animals';
import Login, { loader as authLoader } from './pages/Login';
import { QueryClientProvider } from '@tanstack/react-query';
import TestPage from './pages/Test';
import OrganizationsLayout from './pages/OrganizationsLayout';
import AnimalsLayout from './layouts/Animals';
import { queryClient } from './utils/utils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


// TODO: transfer to react query
// TODO: create unit tests
const App = () => {
  const Router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [{
        index: true,
        element: <HomePage />,
      }, {
        path: 'animals',
        element: <AnimalsLayout />,
        children: [{
          index: true,
          loader: animalsLoader,
          element: <AnimalsPage />,
        }, {
          path: ':animalId',
          id: 'animal',
          loader: animalDetailsLoader,
          children: [{
            index: true,
            element: <AnimalDetailsPage />,
          }]
        }]
      }, {
        path: 'organizations',
        element: <OrganizationsLayout />,
        children: [{
          index: true,
          element: <OrganizationsPage />,
        }, {
          path: ':testId',
          element: <TestPage />
        }]
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App