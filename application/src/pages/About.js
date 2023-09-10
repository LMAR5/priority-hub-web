import React from 'react';
import '../css/About.css';
import {
    Link,
} from 'react-router-dom';

const About = () => {
    return (
        <div className ="about">

            <div className = "header">
                <h1>SFSU - CSC 648-04</h1>
                <h1>Team 5</h1>
            </div>
            
            {/* Links each button to corresponding member's about page in the page folder.
                ex: '/MemberAndy' links to MemberAndy.js*/}
            <div className = "members">
                <Link to=''>
                <button>
                    <p>Luis Aguilar<br />Team Leader</p>
                </button>
                </Link>

                <Link to='/MemberAndy'>
                <button>
                    <p>Andy Li<br />Front-End Lead</p>
                </button>
                </Link>
                <Link to=''>
                    <button>
                        <p>Lam Tran<br />Back-End Lead</p>
                    </button>
                </Link>  
                <Link to=''>
                    <button>
                        <p>Trevor Eichler<br />GitHub Master</p>
                    </button>
                </Link>
                <Link to=''>
                    <button>
                        <p>Tyler Tam<br />Scrum Master</p>
                    </button>
                </Link>
                
            </div>
        </div>  
    );
};


export default About;