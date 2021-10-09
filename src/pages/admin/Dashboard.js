import React,{useContext} from 'react'
import './mainDash.css';

import {AuthContext} from '../../context/AuthContext';

export default function Dashboard() {

const { state } = useContext(AuthContext);
    
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
