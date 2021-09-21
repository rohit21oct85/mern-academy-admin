import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory ,NavLink, useLocation, useParams } from "react-router-dom";
import './Nav.css';
import { Nav} from 'react-bootstrap'
import {AuthContext} from '../context/AuthContext';

import axios from 'axios'
import API_URL from '../helper/APIHelper';

import { useToasts } from 'react-toast-notifications';
import useMainModules from '../hooks/modules/useMainModule';


export default function Navigation() {
    const history = useHistory();
    const location = useLocation();
    const params = useParams();

    const { state, dispatch } = useContext(AuthContext);

    const {data:routes} = useMainModules(state.role,state.email);

    const [formData] = useState({})
    const { addToast } = useToasts();
    async function logout(){
        formData.email = state.email
        let response = await axios.post(`${API_URL}/admin/logout`,{
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
                history.push('/')
            },1000)
        }
    }
return (
<>

{state.isLoggedIn && (
<div className="login_menu col-lg-2 col-md-2 col-12" bg="dark" variant="dark" expand="lg">
    <div className="webLogo row">
        <img src="/logo.png" className="mr-2" style={{ width: '65%'}} alt="User"/>
    </div>
    <div className="user_area">
        <div className="col-md-12 user_icon">
            <div className="col-md-12 p-0">
                <img src={`/profile.jpg`} className="profileImage"/>

            </div>
        </div>

        <div className="user_options mt-1">
            <div className="col-md-12 p-0 user_details">
                <span className="user_name">{state?.fullname}</span>
            </div>
            <div className="col-md-12 p-0 user_details">
                <span className="user_name">{state?.email}</span>
            </div>
            <ul>
                <li as={Link}>
                    <button className="bg-success dark br-10 pl-2 pr-2">
                        <span className="fa fa-lock mr-2"></span> {state?.role_slug?.replace('-'," ")}
                    </button>
                </li>
                <li as={Link} onClick={logout} alt="Logout">
                    <button className="bg-danger dark br-10  pl-2 pr-2">
                        <span className="fa fa-power-off mr-2"></span>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    </div>
    <div className="navbar_menus">
        <ul>
            <li>
                <Nav className="ml-auto">
                    <NavLink to={`/${state?.role_slug}/dashboard`}> <span className={`bi bi-speedometer text-warning`}></span> Dashboard </NavLink>
                </Nav>
            </li>
            {state?.role == '1' && (
            <>
            <li>
                <Nav className="ml-auto">
                    <NavLink to={`/${state?.role_slug}/app-modules`} > <span className="fa fa-gears"></span> App Modules</NavLink>
                </Nav>
            </li>
            <li>
                <Nav className="ml-auto">
                    <NavLink to={`/${state?.role_slug}/role-modules`} > <span className="fa fa-gears"></span> Role Modules</NavLink>
                </Nav>
            </li>
            
            <li>
                <Nav className="ml-auto">
                    <NavLink to={`/${state?.role_slug}/app-admins`} > <span className="fa fa-gears"></span> App Admins</NavLink>
                </Nav>
            </li>

            </>
            )}
           {routes?.map(routes => { 
                return (
                <li key={routes?._id}>
                <Nav className="ml-auto">
                    <NavLink to={`/${routes?.module_slug}`} >
                    <span className={`fa ${routes?.module_icon} mr-2 mt-1`}></span>
                        {routes?.module_name}</NavLink>
                </Nav>
                </li>
                )
            })}
           
            


        </ul>
    </div>
            
            
</div>
)}
        
</>             
)
}
