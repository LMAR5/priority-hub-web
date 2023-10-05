import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>  
    <BrowserRouter>
    <Routes>
        {AppRoutes.map((route, idx) => {
          const {element, ...rest} = route;
          return <Route key={idx} {...rest} element={element} />
        })}
      </Routes>
    </BrowserRouter>             
    </Layout>
  );
}

export default App;