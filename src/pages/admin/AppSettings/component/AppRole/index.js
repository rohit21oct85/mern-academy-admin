import React from 'react'
import {useHistory} from 'react-router-dom'
import CreateAppRole from './component/CreateAppRole';
import AppRoleList from './component/AppRoleList';

import './AppRole.css'

export default function AppRole() {
    const history = useHistory();
     return (
        <div className="col-lg-12 col-md-12">
            <div className="main-area-all">
                <div className="dash-cont-start">
                    <div className="row">
                        <div className="col-md-3">
                            <CreateAppRole />
                        </div>
                        <div className="col-md-9">
                            <AppRoleList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
