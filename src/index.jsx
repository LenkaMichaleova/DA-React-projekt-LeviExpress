import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import './global.css';
import { App } from './components/App';
import { HomePage } from './pages/HomePage';
import { ReservationPage } from './pages/ReservationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'reservation',
        element: <ReservationPage />,
      },
    ]
  },
]);

createRoot(document.querySelector('#app')).render(
  <RouterProvider router={router} />
);
