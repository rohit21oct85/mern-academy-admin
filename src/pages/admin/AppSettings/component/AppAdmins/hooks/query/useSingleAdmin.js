import {useParams} from 'react-router-dom'
import {useContext}  from 'react'
import {useQuery} from 'react-query';
import axios from 'axios';
import {AuthContext} from 'context/AuthContext';
import API_URL from 'helper/APIHelper'

export default function useSingleAdmin() {
    const params = useParams();
    const admin_id = params?.admin_id
    const {state } = useContext(AuthContext);
    return useQuery(`single-admisn-${admin_id}`, async () => {
        if(admin_id !== undefined){
            const result = await axios.get(`${API_URL}/admin/view/${admin_id}`,{
                headers: {
                    'Content-Type': 'Application/json',
                    'Authorization':'Bearer '+state.access_token
                }
            });
            
            return result.data.data; 
        }
        
    });
    
}
