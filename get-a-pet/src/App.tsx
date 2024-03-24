import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import HomePage from './pages/HomePage';
import AnimalsPage from './pages/Animals/Animals';
import OrganizationsPage from './pages/Organizations';
import AnimalDetailsPage from './pages/AnimalDetails';
import { loader as rootLoader } from './pages/Root';
import AuthContextProvider from './store/auth-context';
import ErrorPage from './pages/Error/Error';
import { loader as animalsLoader } from './pages/Animals/Animals';

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
    }
  ])
  return (
    <AuthContextProvider>
      <RouterProvider router={Router} />
    </AuthContextProvider>
  )
}

export default App