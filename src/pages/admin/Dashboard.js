import React,{useContext, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import './mainDash.css';

import {AuthContext} from '../../context/AuthContext';

export default function Dashboard() {
    const history = useHistory();
    const location = useLocation();
    const path = location?.pathname;
    const { state, dispatch } = useContext(AuthContext);
    useEffect(checkURL, [state]);

    async function checkURL(){
        if(path === '/super-admin/'){
            history.push(`/super-admin/dashboard`);
        }    
    }

return (

<>
{state.isLoggedIn && (
   
<div className="col-lg-10 col-md-10 main_dash_area">
    <div className="main-area-all">
        <div className="dashboard_main-container">
            <div className="dash-main-head">
                <h2>Dashboard</h2>
            </div>
            <div className="dash_over_view">
                <div className="row">
                    <div className="col-md-12 pl-0">
                        <h3>Welcome, to MERN Academy Admin Panel</h3>    
                    </div>
                </div>    
            </div>
        </div>
    </div>
    
</div>  
)}   
</>

)
}
