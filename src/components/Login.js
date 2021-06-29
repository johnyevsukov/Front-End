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
        height: 5vh;
        font-size: large;
        font-weight: bold;
    }

    input {
        height: 60%;
        font-size: medium;
        border-radius: 8px;
        outline: none;
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
        &:hover {
            background-color: #006aff;
            color: white;
            transform: scale(1.1);
            transition: all .2s ease-in-out;
        }

        transition: all .2s ease-in-out;
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
            console.log(res)
            setLoading(false)
            localStorage.setItem('token', res.data.token)
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
                <label>
                    Username:
                    <input
                    type='text'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    placeholder='Username..'
                    />
                </label>
                <label>
                    Password:
                    <input
                    type='password'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder='Password..'
                    />
                </label>
                <button>Login</button>
                {loading && <div className='loader'></div>}
                {error && <h3>- {error} -</h3>}
            </form>
        </StyledLogin>
    )
}

export default Login