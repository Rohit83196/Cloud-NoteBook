import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({name:"" ,  email: "", password: "" , cpassword:"" });
  let history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name,email,password}=credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name , email , password})
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      // redirect
      localStorage.setItem('token', json.jwtData)
      history("/")
      props.showAlert("SuccessFully SignUp","success")
    }
    else {
      props.showAlert("invalid Credentials","danger")
    }
  }
  const onChange = (e) => {
    // // console.log({ ...note, [e.target.name]: e.target.value });
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h1>SignUp to Create Account</h1>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input  onChange={onChange} type="text" className="form-control" name='name' id="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input  onChange={onChange} type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input  onChange={onChange} type="password" className="form-control" name='password' id="password" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input  onChange={onChange} type="password" className="form-control" name='cpassword' id="cpassword" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
