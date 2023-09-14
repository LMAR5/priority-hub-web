import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import AppRoutes from './AppRoutes';

const App = () => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {AppRoutes.map((route, idx) => {
                        const { element, ...rest } = route;
                        return <Route key={idx} {...rest} element={element} />;
                    })}

                </Routes>
            </BrowserRouter>

        </>
    );
}
export default App;