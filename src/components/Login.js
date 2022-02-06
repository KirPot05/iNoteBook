import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = ({showAlert}) => {

    const [credentials, setCredentials] = useState({email: "", password: ""});

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = credentials;

        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        });

        const data = await response.json();
        console.log(data);

        if(data.success){
            localStorage.setItem('token', data.authToken);
            navigate('/');
            showAlert("Successfully Logged In", 'success');
        } else{
            showAlert("Invalid Credentials", 'danger');
        }

    }

    return (
        <div>

            <form className='container w-75' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email" aria-describedby="email" onChange={onChange} value={credentials.email}/>
                    <div id="email" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' id="password" onChange={onChange} value={credentials.password}/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>



        </div>
    );
};

export default Login;
