import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router'

const StyledLogin = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 2px solid gray;
background: linear-gradient(-45deg, #48d9ca, #006aff, #23a6d5, #23d5ab);
background-size: 400% 400%;
animation: gradient 15s ease infinite;

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 2px solid gray;
    width: 100%;
    height: 100vh;

    label {
        display: flex;
        flex-direction: column;
        margin-top: 2%;
        margin-bottom: 2%;
        text-align: left;
        width: 40%;
        height: 65px;
        font-size: large;
        font-weight: bold;
    }

    input {
        height: 60%;
        font-size: medium;
        border-radius: 8px;
        outline: none;
        width: 25vw;
    }

    input[name='password'] {
        -webkit-text-security: disc;
        text-security: disc;
    }

    button {
        width: 20%;
        height: 4vh;
        border-radius: 10px;
        font-size: large;
        background-color: #fafdff;
        margin-top: 2%;
        &:active {
            background-color: #ededed;
        }
    }

    h1 {
        color: white;
    }

    h3 {
        color: red;
        font-size: x-large;
    }

    .loader {
        border: 16px solid #f3f3f3;
        border-top: 16px solid #3498db;
        border-radius: 50%;
        width: 1vh;
        height: 1vh;
        animation: spin 2s linear infinite;
        margin-top: 2%;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
}

@media (max-width: 1600px) {

}

@media (max-width: 1224px) {

}

@media (min-width: 1224px) {  
    button {    
        &:hover {
            background-color: #006aff;
            color: white;
            transform: scale(1.1);
            transition: all .2s ease-in-out;
        }
        transition: all .2s ease-in-out;
    }
}

@media (max-width: 680px) {
    form {
        input {
            width: 50vw;
        }
        button {
            height: 8vh;
            margin-top: 5%;
            width: 80%
        }
    }
}
`


const initialFormValues = {
    username: '',
    password: ''
}

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const { push } = useHistory()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('https://pet-post.herokuapp.com/api/auth/login', formValues)
        .then(res => {
            setLoading(false)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_id', res.data.user_id)
            push('/timeline')
        })
        .catch(err => {
            console.log(err.response.data.message)
            setLoading(false)
            setError(err.response.data.message)
        })
    }

    return (
        <StyledLogin>
            <form onSubmit={handleSubmit}>
                <h1>Welcome Back, Buddy!</h1>
                <div>
                <label>
                    Username:
                    <input
                    type='text'
                    name='username'
                    placeholder='Username..'
                    value={formValues.username}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                    type='password'
                    name='password'
                    placeholder='Password..'
                    value={formValues.password}
                    onChange={handleChange}
                    />
                </label>
                </div>
                <button>Login</button>
                {loading && <div className='loader'></div>}
                {error && <h3>- {error} -</h3>}
            </form>
        </StyledLogin>
    )
}

export default Login
