import React from 'react';
import CustomNavBar from './CustomNavBar';
import Container from 'react-bootstrap/esm/Container';
import CustomFooter from './CustomFooter';
import { Outlet } from 'react-router-dom';

function Layout(){
    return(
        <div>
            <CustomNavBar />            
            <Container>            
                {/* {props.children} */}
                <Outlet/>
                <CustomFooter />
            </Container>
        </div>
    );
}

export default Layout;