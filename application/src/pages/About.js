import React from 'react';
import '../css/About.css';
import {
    Link, useNavigate
} from 'react-router-dom';
import Global from '../GlobalConstants';

const About = () => {
    return (
        <div className="about">

            <div className="header">
                <h1>SFSU - CSC 648-04</h1>
                <h1>Team 5</h1>
            </div>

            <div className="members">
                {Global.team.map((member, idx) =>
                    <Link to='/MemberGeneric' key={idx} state={member}>
                        <button>
                            <p>{member.name}<br /> {member.role}</p>
                        </button>
                    </Link>
                )}

            </div>
        </div>
    );
};


export default About;