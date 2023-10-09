import React from 'react';
import CustomNavBar from './CustomNavBar';
import Container from 'react-bootstrap/esm/Container';
import CustomFooter from './CustomFooter';

function Layout(props){
    return(
        <div>
            <CustomNavBar />
            <Container>
                {props.children}
                <CustomFooter />
            </Container>
        </div>
    );
}

export default Layout;