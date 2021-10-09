import { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from 'helper/APIHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from 'context/AuthContext';

export default function useCreateAdmin() {
      
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const history = useHistory();
      
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }      
      const { addToast } = useToasts();
      return useMutation(formData => {
            return axios.post(`${API_URL}/admin/register`, formData, options)
        },{
        onSuccess: () => {
            queryClient.invalidateQueries('admins')
            addToast('Roles added successfully', { appearance: 'success',autoDismiss: true });
            history.push(`/${state?.role_slug}/app-settings/app-admins`);
        }
      });
      
}
