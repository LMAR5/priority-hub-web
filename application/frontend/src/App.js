import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignInCustom from './components/Authentication/SignInCustom';
//import Layout from './components/Layout/Layout';
import useToken from './components/Authentication/useToken';

const router = createBrowserRouter(AppRoutes);

function App() {

  const { token, setToken } = useToken();  

  if (!token) {
    return <SignInCustom setToken={setToken} />
  }

  return (
    <RouterProvider router={router} />
    // <Layout>
    //   <BrowserRouter>
    //     <Routes>          
    //       {AppRoutes.map((route, idx) => {
    //         const { element, ...rest } = route;
    //         return <Route key={idx} {...rest} element={element} />
    //       })}
    //     </Routes>
    //   </BrowserRouter>
    // </Layout>
  );
}

export default App;