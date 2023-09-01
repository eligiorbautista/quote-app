import '../App.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(event) {
    event.preventDefault();
    const response = await fetch('https://full-stack-mern-api.onrender.com/api/register', {
      mode : 'cors',
      method : 'POST',
      headers: {'Content-Type': 'application/json',},
      body: JSON.stringify({ 
        name, 
        email, 
        password, 
      }),
    })

    console.clear();
    const data = await response.json(); 
    console.log(data);
    if (data.status === 'ok') {
      alert('Congratulations!\nYour account has been successfully created ✔');
      setName('');
      setEmail('');
      setPassword('');
    } else if (data.status === 'error') {
      alert(data.error + ' ✘');
      setEmail('');
    }
  }

  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input required type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <br/>
        <input required type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <br/>
        <input required type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <br/>
        <p>Already have an account? <Link to={'/'}>Log In</Link></p>
        <input type="submit" value="Register"/>
      </form>
      <br/>
      <small><i>Created by Eli Bautista.</i></small>
    </div>
  );
}

export default Register;
