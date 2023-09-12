import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
// import About from './pages/About';
// import MemberAndy from './pages/MemberAndy';
import AppRoutes from './AppRoutes';

const App = () => {

    return(
        <>
            <BrowserRouter>
                <Routes>
                    {AppRoutes.map((route, idx) => {
                        const { element, ...rest} = route;
                        return <Route key={idx} {...rest} element={element} />;
                    })}
                    {/* <Route path='/' element={<About />} />
                    <Route path='/MemberAndy' element={<MemberAndy />} /> */}
                </Routes>
            </BrowserRouter>
             
        </>
    );
}
export default App;