import { AuthContext } from 'context/AuthContext';
import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'

export default function ActionMenu({role}) {
    const history = useHistory();
    const {state} = useContext(AuthContext)
    return (
        <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row-reverse'}}>
            <button className="btn btn-sm dark"
            onClick={ e => {
                e.preventDefault();
                history.push(`/${state.role_slug}/app-settings/app-roles/${role?._id}`)
            }}>
            <span className="fa fa-pencil-square mr-2"></span> &nbsp;
                Edit
            </button>
        </div>
    )
}
