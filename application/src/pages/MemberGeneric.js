import { useLocation } from 'react-router-dom';
import React from 'react';
import Global from '../GlobalConstants';

const MemberGeneric = () => {

    const location = useLocation();
    let memberId = location.state.id;

    function renderMember(mID){
        var final_member = Global.team.filter((mem) => mem.id == mID);
        console.log(final_member);        
        return (
            <div>
                <h1>{final_member[0].name}</h1>
                <h2>{final_member[0].role}</h2>
                <h3>Picture</h3>
                <img src={final_member[0].picture} alt='profile picture' height={250} />
                <h3>Description</h3>
                <p>{final_member[0].description}</p>
            </div>            
        );
    }
    return(
        <div>
            {renderMember(memberId)}
        </div>
    )
}

export default MemberGeneric;