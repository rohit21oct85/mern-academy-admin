import React from 'react'
import ActionMenu from './ActionMenu'

export default function SingleRole({role}) {
    return (
        <tr> 
            <td>
                {role?.role_id}
            </td>
            <td>
                {role?.role_name}
            </td>
            
            <td>
                {role?.role_slug}
            </td>
            
            <td>
                <ActionMenu  role={role}/>
            </td>
        </tr> 
    )
}
