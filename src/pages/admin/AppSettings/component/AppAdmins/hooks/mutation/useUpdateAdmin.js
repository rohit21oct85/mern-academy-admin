import { useContext } from 'react'
import { useParams, useHistory} from 'react-router-dom'
import {useMutation, useQueryClient} from 'react-query'
import axios from 'axios'
import API_URL from 'helper/APIHelper';
import { useToasts } from 'react-toast-notifications';
import {AuthContext} from 'context/AuthContext';

export default function useUpdateAdmin() {
      const params = useParams();
      
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
            const id = params?.role_id
            return axios.patch(`${API_URL}/admin/update/${id}`, formData, options)
        },{
        onSuccess: () => {
            queryClient.invalidateQueries('admins')
            addToast('Category Updated successfully', { appearance: 'success',autoDismiss: true });
            history.push(`/${state?.role_slug}/app-settings/app-admins`);
        }
        });
      return status;
}
