import React from 'react'
import CreateAppRole from './component/CreateAppRole';
import AppRoleList from './component/AppRoleList';

import './AppRole.css'

export default function AppRole() {
     return (
        <div className="col-lg-12 col-md-12">
            <div className="main-area-all">
                <div className="dash-cont-start">
                    <div className="row p-3">
                        <div className="col-md-3">
                            <CreateAppRole />
                        </div>
                        <div className="col-md-8 offset-md-1">
                            <AppRoleList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
