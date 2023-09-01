import '../App.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

 

function Login() {
  const  navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(event) {
    event.preventDefault();
    try {
      const response = await fetch('https://full-stack-mern-api.onrender.com/api/login', {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          email, 
          password, 
        }),
      })
  
  
      const data = await response.json(); 
      if (data.user) {
  
        localStorage.setItem('token', data.user);
  
        //alert('Login successful ✔');
        console.log('Login successful ✔');
        navigate('/dashboard');
        //window.location.href = '/dashboard';
         
      } 
      else {
        alert('Invalid email / password ✘\nPlease check your email and password and try again.')
        setEmail('');
        setPassword('');
      }
  
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Log In</h1>
      <form onSubmit={loginUser}>
        <input required type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <input required type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <p>Don't have an account yet? <Link to={'/register'}>Register</Link></p>
        <input type="submit" value="Log In"/>
      </form>
      <br/>
      <small><i>Created by Eli Bautista.</i></small>
    </div>
     
      
  );
}

export default Login;
