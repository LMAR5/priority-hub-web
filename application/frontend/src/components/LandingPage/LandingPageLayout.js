import React from 'react';
import LandingPageHeader from './LandingPageHeader';
import LandingPageFooter from './LandingPageFooter';
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';

function LandingPageLayout(){
    return(
        <div>
            <LandingPageHeader/>
            <Container>                
                <Outlet />
                <LandingPageFooter />
            </Container>
        </div>
    );
}

export default LandingPageLayout;
