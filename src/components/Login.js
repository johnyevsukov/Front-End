import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

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
}
`


const initialFormValues = {
    username: '',
    password: ''
}

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [error, setError] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://pet-post.herokuapp.com/api/auth/login', formValues)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err.response.data.message)
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
                    type='text'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    placeholder='Password..'
                    />
                </label>
                <button>Login</button>
                {error && <h3>- {error} -</h3>}
            </form>
        </StyledLogin>
    )
}

export default Login