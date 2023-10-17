import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter(AppRoutes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;