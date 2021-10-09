import React from 'react'
import './AppAdmins.css'
import AppAdminList from './component/AppAdminList'
import CreateAppAdmin from './component/CreateAppAdmin'

export default function AppAdmins() {
      return (
            <div className="col-lg-12 col-md-12">
            <div className="main-area-all">
                <div className="dash-cont-start">
                    <div className="row p-3">
                        <div className="col-md-3">
                            <CreateAppAdmin />
                        </div>
                        <div className="col-md-8 offset-md-1">
                            <AppAdminList />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )
}
