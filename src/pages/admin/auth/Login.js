import React , {useState, useEffect,useRef, useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import {AuthContext} from '../../../context/AuthContext';
import './Login.css';
import axios from 'axios'
import API_URL from '../../../helper/APIHelper';
import { useToasts } from 'react-toast-notifications';

export default function Login() {
    const history = useHistory();
    const { addToast } = useToasts();
    const emailRef = useRef();
    const passwordRef = useRef();
    const {dispatch,state } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email === ''){
            addToast('Please enter email address', { appearance: 'error',autoDismiss: true });
            return false;
        }else if(password === ''){
            addToast('Please enter password', { appearance: 'error',autoDismiss: true });
            passwordRef.current.focus()
            return false;
        }else{
            setLoading(true);
            console.log(process.env.REACT_APP_NODE_ENV)
            const formData = {email: emailRef.current.value , password: passwordRef.current.value};
            const response = await axios.post(`${API_URL}/admin/login`, formData);
            if(response?.status === 203){
                addToast(`${response?.data?.message}`, { appearance: 'error',autoDismiss: true });
                setLoading(false);
            }else{
                let access_token = response?.data?.accessToken
                let refresh_token = response?.data?.refreshToken
                let fullname = response?.data?.admin?.fullname
                let email = response?.data?.admin?.email
                let role = response?.data?.admin?.role
                let role_slug = response?.data?.admin?.role_slug
                    
                let created_at = response?.data?.admin?.created_at
                
                let isLoggedIn = true;
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('fullname', fullname);
                localStorage.setItem('email', email);
                localStorage.setItem('role', role);
                localStorage.setItem('role_slug', role_slug);
                localStorage.setItem('created_at', created_at);
                localStorage.setItem('isLoggedIn', isLoggedIn);
                const payloadData = {
                    isLoggedIn,
                    fullname,
                    email,
                    role,
                    role_slug,
                    created_at,
                    access_token,
                    refresh_token
                }
                if(isLoggedIn){
                    dispatch({type: 'LOGIN', payload: payloadData});
                    // window.location.href = `/admin/dashboard`;
                }
            }
            
            
            
        }   
    }
    
    useEffect(checkLoggedInUser,[state]);
    async function checkLoggedInUser(){
        if(state?.isLoggedIn){
            window.location.href = `/${state.role_slug}/dashboard`;
        }else{
            history.push('/admin/login');
        }
    }

    return (
        <div className="container-fluid p-0 m-0 text-left LoginBg" style={{
            background: `url('/bg.jpg')`
        }}>
            <div className="row no-gutter">
                  <div className="logo">
                        <h1>MERN Academy</h1>
                  </div>  
                <div className="col-md-3 adminLoginDiv">
                    
                    <h4>Administrator Login </h4>    
                    <hr />
                
                <form autoComplete="Off" onSubmit={submitForm}>
                    <div className="form-group text-left">
                        <label> <span className="fa fa-send mr-2"></span> Email address</label>
                        <input className="form-control" type="email" autoComplete="off" ref={emailRef} placeholder="Enter email" />
                        <p className="text-muted mt-2">
                            We'll never share your email with anyone else.
                        </p>
                    </div>
                    <hr />
                    <div className="form-group text-left">
                        <label> <span className="fa fa-lock mr-2"></span> Password</label>
                        <input className="form-control" type="password" autoComplete="Off" ref={passwordRef} placeholder="Password" />
                        <p className="text-muted mt-2">
                            We'll never share your password with anyone else

                        </p>
                    </div>
                    <hr />
                    <button 
                        className="btn btn-md btn-block btn-success dark w-100" 
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                            <span className="fa fa-spinner mr-2"> </span> Authenticating...
                            </>
                        ):(
                            <>
                            <span className="fa fa-lock mr-2"> </span> Login Your Account
                            </>
                        )}
                    </button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
 