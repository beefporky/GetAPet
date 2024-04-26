import Root from './pages/Root';
import HomePage from './pages/HomePage/HomePage';
import AnimalsPage from './pages/Animals/Animals';
import OrganizationsPage, { loader as organizationsLoader } from './pages/Organizations/Organizations';
import AnimalDetailsPage, { loader as animalDetailsLoader } from './pages/Animals/AnimalDetails/AnimalDetails';
import ErrorPage from './pages/Error/Error';
import { loader as animalsLoader } from './pages/Animals/Animals';
import Login, { loader as authLoader } from './pages/Login/Login';
import OrganizationsLayout from './layouts/OrganizationsLayout';
import AnimalsLayout from './layouts/Animals';
import OrganizationDetailsPage, { loader as organizationDetailsLoader } from './pages/Organizations/OrganizationDetail/OrganizationDetail';

export const routesConfig = [
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
        errorElement: <ErrorPage />
      }, {
        path: ':animalId',
        id: 'animal',
        loader: animalDetailsLoader,
        children: [{
          index: true,
          element: <AnimalDetailsPage />,
          errorElement: <ErrorPage />
        }]
      }]
    }, {
      path: 'organizations',
      element: <OrganizationsLayout />,
      children: [{
        index: true,
        loader: organizationsLoader,
        element: <OrganizationsPage />,
        errorElement: <ErrorPage />
      }, {
        path: ':organizationId',
        loader: organizationDetailsLoader,
        children: [{
          index: true,
          element: <OrganizationDetailsPage />,
          errorElement: <ErrorPage />
        }]
      }]
    }]
  },
  {
    path: 'login',
    element: <Login />,
    loader: authLoader,
    errorElement: <ErrorPage />
  }
]

