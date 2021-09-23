import { useContext } from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from 'helper/APIHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from 'context/AuthContext';

export default function useDeleteRole() {
      const location = useLocation();
      const path  = location.pathname;
      
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
            return axios.post(`${API_URL}v1/role/delete`,formData, options)
        },{
        onSuccess: () => {
            queryClient.invalidateQueries('roles')
            history.push('/admin/app-roles');
            addToast('Role deleted successfully', { appearance: 'success',autoDismiss: true });
        }
        });
      return status;
}
