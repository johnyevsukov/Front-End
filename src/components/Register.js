import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'


const StyledRegister = styled.div`
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
    }
}
`


const initialFormValues = {
    user_email: '',
    username: '',
    password: '',
    re_password: ''
}

const Register = () => {
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
        if(formValues.password === formValues.re_password) {
            axios.post('https://pet-post.herokuapp.com/api/auth/register', {
                username: formValues.username,
                password: formValues.password,
                user_email: formValues.user_email
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                setError(err.response.data.message)
            })
        }
        else {
            setError('Passwords do not match!')
        }
    }

    return (
        <StyledRegister>
            <form onSubmit={handleSubmit}>
                <h1>Oh Boy! Glad You're Joining!</h1>
                <label>
                    Email:
                    <input
                    type='text'
                    placeholder='Email..'
                    name='user_email'
                    value={formValues.user_email}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Username:
                    <input
                    type='text'
                    placeholder='Username..'
                    name='username'
                    value={formValues.username}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Password:
                    <input
                    type='text'
                    placeholder='Password..'
                    name='password'
                    value={formValues.password}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Re-enter Password:
                    <input
                    type='text'
                    placeholder='Password..'
                    name='re_password'
                    value={formValues.re_password}
                    onChange={handleChange}
                    />
                </label>
                <button>Create Account!</button>
                {error && <h3>{error}</h3>}
            </form>
        </StyledRegister>
    )
}

export default Register