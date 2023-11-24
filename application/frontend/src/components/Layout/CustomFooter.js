import React from 'react';
import Container from 'react-bootstrap/esm/Container';

function CustomFooter(){
    return(        
        <footer className="fixed-bottom">
            <Container>
                <p>Environment: {process.env.REACT_APP_TITLE}</p>
            </Container>            
        </footer>        
    );
}

export default CustomFooter;