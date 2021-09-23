import React,{useContext, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import './style.css';

import {AuthContext} from '../../../context/AuthContext';
import { useParams } from 'react-router-dom';
import TopMenu from './component/TopMenu';
import AppProfile from './component/AppProfile';
import AppRole from './component/AppRole';
import AppModule from './component/AppModule';
import RoleModulePermission from './component/RoleModulePermission';
import AppAdmins from './component/AppAdmins';

export default function AppSettings() {
    const history = useHistory();
    const params = useParams();
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
   
<div className="col-lg-10 col-md-10">
    <div className="main-area-all">
        <div className="dashboard_main-container">
            <div className="dash-main-head">
                <h2>{path?.split('/')[2].toLocaleUpperCase().replace('-',' ')}</h2>
            </div>
            <TopMenu />
            <div className="row">
                <div className="col-md-12 pl-0">
                    {params?.page_type === 'app-profile' && <AppProfile />}
                    {params?.page_type === 'app-roles' && <AppRole />}
                    {params?.page_type === 'app-admins' && <AppAdmins />}
                    {params?.page_type === 'app-modules' && <AppModule />}
                    {params?.page_type === 'role-modules-permissions' && <RoleModulePermission />}
                </div>
            </div>  
        </div>
    </div>
    
</div>  
)}   
</>

)
}
