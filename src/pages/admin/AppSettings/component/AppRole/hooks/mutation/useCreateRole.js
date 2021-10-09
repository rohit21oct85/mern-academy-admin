import { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from 'helper/APIHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from 'context/AuthContext';

export default function useCreateRole() {
      
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
            return axios.post(`${API_URL}/role/create`, formData, options)
        },{
        onSuccess: () => {
            queryClient.invalidateQueries('roles')
            addToast('Roles added successfully', { appearance: 'success',autoDismiss: true });
            history.push(`/${state?.role_slug}/app-settings/app-roles`);
        }
      });
      
}
