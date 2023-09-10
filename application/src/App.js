import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import About from './pages/About';
import MemberAndy from './pages/MemberAndy';


const App = () => {

    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<About />} />
                    <Route path='/MemberAndy' element={<MemberAndy />} />
                </Routes>
            </BrowserRouter>
             
        </>
    );
}
export default App;