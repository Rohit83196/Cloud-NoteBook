import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""});
    let history = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json = await response.json()
          console.log(json);
          if (json.success) {
            // redirect
            localStorage.setItem('token', json.jwtData)
            props.showAlert("SuccessFully LogIn","success")
            history("/")
          }
          else{
            props.showAlert("invalid Details","danger")

          }
    }
    const onChange = (e) => {
        // // console.log({ ...note, [e.target.name]: e.target.value });
        setCredentials({ ...credentials, [e.target.name]: e.target.value })  
      }
    return (
        <div className='container'>
          <h1>LogIn To To TAkes Notes</h1>
            <form onSubmit={handleSubmit} >
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input value={credentials.email} onChange={onChange} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={credentials.password} onChange={onChange} type="password" className="form-control" name='password' id="password"/>
                </div>
          
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    );
}

export default Login;
