import {useParams} from 'react-router-dom'
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import API_URL from '../../helper/APIHelper'

export default function useMainModule(role,email) {
    const params = useParams();
    const {state } = useContext(AuthContext);
    
    return useQuery(`role-modules-${role}-${email}`, async () => {
            if(role && email){
                const result = await axios.get(`${API_URL}role-module/view/${role}/${email}`,{
                    headers: {
                        'Content-Type': 'Application/json',
                        'Authorization':'Bearer '+state.access_token
                    }
                });
                return result.data.data; 
            }
        
    });
    
}
