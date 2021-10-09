import { useContext } from 'react'
import { useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from 'helper/APIHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from 'context/AuthContext';

export default function useDeleteRole() {
      
      const history = useHistory();
      const queryClient = useQueryClient()
      const {state} = useContext(AuthContext);
      const options = {
            headers: {
                  'Content-Type': 'Application/json',
                  'Authorization':'Bearer '+state.access_token
            }
      }      
      const { addToast } = useToasts();
      const status =  useMutation((formData) => {
            return axios.post(`${API_URL}/role/delete`,formData, options)
        },{
        onSuccess: () => {
            queryClient.invalidateQueries('roles')
            history.push(`/${state?.role_slug}/app-settings/app-roles`);
            addToast('Role deleted successfully', { appearance: 'success',autoDismiss: true });
        }
        });
      return status;
}
