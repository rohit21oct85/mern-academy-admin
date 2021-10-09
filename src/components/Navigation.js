import React, { useContext, useState } from 'react'
import { Link, useHistory ,NavLink } from "react-router-dom";
import './Nav.css';
import { Nav} from 'react-bootstrap'
import {AuthContext} from 'context/AuthContext';

import axios from 'axios'
import API_URL from 'helper/APIHelper';

import { useToasts } from 'react-toast-notifications';
import useMainModules from '../hooks/modules/useMainModule';


export default function Navigation() {
    const history = useHistory();
    
    const { state, dispatch } = useContext(AuthContext);

    const {data:routes} = useMainModules(state.role_slug,state.email);

    const [formData] = useState({})
    const { addToast } = useToasts();

    async function logout(){
        formData.email = state.email
        let response = await axios.post(`${API_URL}/admin/logout`,formData,{
            headers: {
                'Content-Type': 'Application/json',
                'Authorization':'Bearer '+state.access_token
            }
        });
        if(response.status === 201){
            addToast(response.data.message, { 
                appearance: 'error',
                autoDismiss: true
            });
            setTimeout(()=> {
                dispatch({type: 'LOGOUT'})
                history.push(`/`)
            },1000)
        }
    }
return (
<>

{state.isLoggedIn && (
<div className="login_menu col-lg-2 col-md-2 col-12" bg="dark" variant="dark" expand="lg">
    <div className="webLogo row">
        <img src="/logo.jpg" className="mr-2 text-center" style={{ width: '190px'}} alt="User"/>
    </div>
    <div className="user_area row">
        <div className="col-md-12 user_icon">
            <div className="col-md-12 p-0">
                <img src={`/profile.jpg`} className="profileImage" alt="mern-academy-logo"/>

            </div>
        </div>

        <div className="user_options">
            <div className="col-md-12 user_details">
                <span className="user_name">{state?.fullname}</span>
            </div>
            <div className="col-md-12 user_details">
                <span className="user_name">{state?.email}</span>
            </div>
            <ul className="pl-0 pr-0">
                <li as={Link}>
                    <button className="bg-success dark br-10 pl-3 pr-3">
                        <span className="fa fa-lock"></span> 
                        &nbsp; {state?.role_slug?.replace('-'," ")}
                    </button>
                </li>
                <li as={Link} onClick={logout} alt="Logout">
                    <button className="bg-danger dark br-10 ">
                        <span className="fa fa-power-off"></span>&nbsp; 
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <div className="navbar_menus row pr-0 mr-0 pl-0 ml-0">
        <ul>
            <li>
                <Nav className="ml-auto">
                    <NavLink to={`/${state?.role_slug}/dashboard`}> <span className={`bi bi-speedometer text-warning`}></span> Dashboard </NavLink>
                </Nav>
            </li>
            {state?.role_slug === 'super-admin' && (
            <>
            <li>
                <Nav className="ml-auto">
                    <NavLink to={`/${state?.role_slug}/app-settings`} > <span className="fa fa-gears"></span> App Settings</NavLink>
                </Nav>
            </li>
            </>
            )}
           {routes?.map(routes => { 
                return (
                <li key={routes?._id}>
                <Nav className="ml-auto">
                    <NavLink to={`/${routes?.role_slug}/${routes?.module_slug}`} >
                        <span className={`${routes?.module_icon}`}></span>
                        &nbsp; 
                        {routes?.module_name}
                    </NavLink>
                </Nav>
                </li>
                )
            })}
           
            


        </ul>
    </div>
    <div className="nav-footer">
        &copy; Mern Academy - V0.0.1
    </div>        
            
</div>
)}
        
</>             
)
}
