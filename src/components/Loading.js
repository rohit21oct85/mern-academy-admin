import React from 'react'

export default function Loading({isLoading}) {
    return (
        <div>
           {isLoading && (
                <div 
                    className="spinner-border" 
                    style={{width: '16px', height:'16px', marginLeft: '15px'}} 
                    role="status"> 
                </div>
            )} 
        </div>
    )
}

