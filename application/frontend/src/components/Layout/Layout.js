import React from 'react';
import CustomNavBar from './CustomNavBar';
import Container from 'react-bootstrap/esm/Container';

function Layout(props){
    return(
        <div>
            <CustomNavBar />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

export default Layout;