import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';

function Dashboard() {
    const  navigate = useNavigate();
    const [ tempQuote, setTempQuote] = useState('');
    const [ quote, setQuote] = useState('');
    const [ name, setName ] = useState('');

    async function updateQuote (event) {
        event.preventDefault();
        const req = await fetch('https://full-stack-mern-api.onrender.com/api/quote', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body : JSON.stringify({
                quote : tempQuote
            })
        })

        const data = await req.json();
        if (data.status === 'ok') {
            setQuote(tempQuote);
            setTempQuote('');
        } else {
            alert(data.error);
        }
    }

    async function populateQuote () {
        const req = await fetch('https://full-stack-mern-api.onrender.com/api/quote', {
            method : 'GET',
            headers : {'x-access-token': localStorage.getItem('token')}
        })

        const data = await req.json();
        console.log(data);
        if (data.status === 'ok') {
            setQuote(data.quote);
            setName(data.name);
        } else {
            alert(data.error);
        }
    }

    function logout () {
        localStorage.removeItem('token');
        navigate('/');
    }
    
    useEffect ( () => {
        const token = localStorage.getItem('token');

        if (token) {
            const user = decodeToken(token);
            if (!user) {
                localStorage.removeItem('token');
                navigate('/');
            } else {
                populateQuote();
            }
             
        }

    }, []);


    return (
    <div className="App">
        <h2>Welcome, {name}</h2>
        <h3>Your quote: {quote || 'No quote found.' } </h3>
        <form onSubmit={updateQuote}>
            <input type="text" placeholder="Enter a quote" value={tempQuote} onChange={(e)=>setTempQuote(e.target.value)}/>
            <input type="submit" value="Update Quote"/>
            <br/>
            <br/>
        </form>
        <input type="button" value="Log Out" onClick={logout}/>
        <br/>
        <br/>
        <small><i>Created by Eli Bautista.</i></small>
    </div>
    );
    }

export default Dashboard;
