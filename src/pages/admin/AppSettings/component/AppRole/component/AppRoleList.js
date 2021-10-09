import React from 'react'
import Loading from 'components/Loading';
import useAppRole from '../hooks/query/useAppRoles';
import SingleRole from './SingleRole';

export default function AppRoleList() {
    const {data, isLoading} = useAppRole();
    return (
        <>
            <h5 className="form-heading">
            <span className="bi bi-list"></span>&nbsp; App Roles</h5>
            <hr className="mt-1"/>
            {isLoading && (<Loading isLoading={isLoading}/>)}
            <div className="col-md-12 row no-gutter">
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <td>Role ID</td>
                        <td>Role Name</td>
                        <td>Role Slug</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>

                {data?.map( role => { 
                    return (
                        <SingleRole role={role} key={role?._id}/>
                        )
                    })}         
                    </tbody>
            </table>
            </div>
        </>
    )
}
