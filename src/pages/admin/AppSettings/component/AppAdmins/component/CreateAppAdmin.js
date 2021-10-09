import React, {useState, Fragment, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import useSingleAdmin from '../hooks/query/useSingleAdmin';
import useCreateAdmin from '../hooks/mutation/useCreateAdmin';
import useUpdateAdmin from '../hooks/mutation/useUpdateAdmin';
import useDeleteAdmin from '../hooks/mutation/useDeleteAdmin';

import useAppRoles from '../../AppRole/hooks/query/useAppRoles';
import * as helper from 'utils/helper'

function CreateAppAdmin() {
      const history = useHistory();
      const params  = useParams();
      
      const {data} = useSingleAdmin();
      const {data:appRoles} = useAppRoles();
      const [singleAdmin, setSingleAdmin] = useState();
      const [formData, setFormData] = useState({});

      useEffect(setSubAdmin, [data]);
      function setSubAdmin(){
            setSingleAdmin(data)
      }
      function clearFields(){
            setFormData({})
      }
      
      const createMutation = useCreateAdmin(formData);
      const updateMutation = useUpdateAdmin(formData);
      const deleteMutation = useDeleteAdmin(formData);
      
      const saveAppModule = async (e) => {
            e.preventDefault();
            
            if(params?.admin_id){
                  formData['fullname'] = formData?.fullname ?? singleAdmin?.fullname
                  formData['admin_id'] = params?.admin_id
                  formData['role'] = params?.role
                  let role_name = helper.getFilteredData(appRoles, 'role_id',+params?.role,'role_slug')
                  if(formData['role_name'] === undefined){
                        formData['role_name'] = role_name
                  }
                  console.log(formData)
                  await updateMutation.mutate(formData);
            }else{
                  // console.log(formData)
                  // return;
                  let role = formData['role_name'];
                  let role_name = helper.getFilteredData(appRoles, 'role_id',+role,'role_name')
                  let role_slug = helper.getFilteredData(appRoles, 'role_id',+role,'role_slug')
                  formData['role_name'] = role_name
                  formData['role_slug'] = role_slug
                  formData['role'] = role

                  // console.log(formData);
                  await createMutation.mutate(formData);
            }
            clearFields();
      }

      async function handleDelete(e){
            e.preventDefault();
            formData['admin_id'] = params?.admin_id;
            await deleteMutation.mutate(formData);
      }
      return (
            <Fragment>
                  <h5><span className="bi bi-plus-circle-fill"></span> &nbsp; Create Admin</h5>
                  <form onSubmit={saveAppModule}>
                  
                  <div className="form-group">
                    <select className="form-control"
                    name="role_name"
                    value={params?.role}
                    onChange={e => {
                        if(params?.admin_id){
                            const role_name = helper.getFilteredData(appRoles, 'role_id',e.target.value,'role_slug')
                            setFormData({...formData, 'role': e.target.value,'role_name': role_name})
                            history.push(`/admin/manage-sub-admin/${params?.page_type}/${e.target.value}/${params?.admin_id}`)
                        }else{
                            setFormData({...formData, [e.target.name]: e.target.value})
                        }
                    }}>
                          <option value="_">Select Roles</option>
                          {appRoles?.map(role => {
                                if(role?.role_id > 1){
                                      return(
                                          <option 
                                                value={role?.role_id} 
                                                data-role_name={role?.role_name} 
                                                key={role?._id}>{role?.role_name}</option>
                                      )
                                }else{
                                      return false
                                }
                          })}
                    </select>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control"
                        name="fullname" 
                        value={params?.admin_id ? singleAdmin?.fullname : formData?.fullname}
                        onChange={e => {
                            if(params?.admin_id){
                                setSingleAdmin({...singleAdmin, [e.target.name]: e.target.value})
                            }else{
                              setFormData({...formData, [e.target.name]: e.target.value})
                            }
                        }}
                        placeholder="First Name"/>
                  </div>
                  
                  <div className="form-group">
                    <input type="text" className="form-control"
                        name="email" 
                        value={params?.admin_id ? singleAdmin?.email : formData?.email}
                        onChange={e => {
                              if(params?.admin_id){
                                    setSingleAdmin({...singleAdmin, [e.target.name]: e.target.value})
                              }else{
                                    setFormData({...formData, [e.target.name]: e.target.value})
                              }
                        }}
                        placeholder="Email address"/>
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control"
                        name="password" 
                        onChange={e => {
                            if(params?.admin_id){
                                setSingleAdmin({...singleAdmin, password: e.target.value})
                            }else{
                              setFormData({...formData, [e.target.name]: e.target.value})
                            }
                        }}
                        placeholder="password"/>
                  </div>
                        
                  <div className="form-group flex">
                    <button className="btn btn-md btn-block dark br-5">
                        {(createMutation?.isLoading ||updateMutation?.isLoading ) ? (
                            <><span className="fa fa-spinner mr-2"></span> &nbsp; Processing...</>
                        ) : (
                            <>
                            {params?.admin_id ? (
                                <><span className="fa fa-save mr-2"></span>&nbsp; Update</>
                                ):(
                                    
                                    <><span className="fa fa-save"></span>&nbsp; Create Admin</>
                            )}
                            </>
                        )}
                        
                    </button>
                    {params?.admin_id && (
                        <>
                        <button className="btn btn-sm dark bg-warning ml-2 br-5"
                        onClick={e => {
                            e.preventDefault();
                            history.push(`/admin/manage-sub-admin`)
                        }}>
                            <span className="fa fa-times mr-2"></span>
                            Cancel
                        </button>
                        <button className="btn btn-sm dark bg-danger ml-2 br-5"
                        onClick={handleDelete}
                        disbaled={deleteMutation?.isLoading?.toString()}
                        >

                            {deleteMutation?.isLoading ? 
                            <><span className="fa fa-spinner mr-2"></span> ... </>
                            :
                            <><span className="fa fa-trash mr-2"></span> Delete</>
                            }
                            
                        </button>
                        </>
                    )}
                </div>

            </form>  
            </Fragment>
      )
}

export default CreateAppAdmin
