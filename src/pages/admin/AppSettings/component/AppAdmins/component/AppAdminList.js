import Loading from 'components/Loading';
import React, { Fragment } from 'react'
import useAppAdmin from '../hooks/query/useAppAdmin';
import SingleAdmin from './SingleAdmin';

function AppAdminList() {
      const {data, isLoading} = useAppAdmin();
      return (
            <Fragment>
                 <h5><span className="bi bi-list"></span> &nbsp; App Admin List</h5> 
                 {isLoading && (<Loading isLoading={isLoading}/>)}
                  <div className="col-md-12 no-gutter">
                        
                  {data?.map( admin => { 
                  return (
                        <SingleAdmin sub_admin={admin} key={admin?._id}/>
                  )
                  })}         
                  </div>

            </Fragment>
      )
}

export default AppAdminList
