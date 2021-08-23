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
background: linear-gradient(-45deg,
    #CFE3FF, #5099FF,
    #006aff, #2E85FF);
background-size: 400% 400%;
animation: gradient 15s ease infinite;

.wrapper {
    border: 2px outset white;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    width: 40rem;
    height: 40rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 70%;
}

.input-field {
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    margin-bottom: 1rem;
}

.error-message {
    color: white;
    font-size: 2.2rem;
    font-weight: bold;
    margin-top: 2rem;
}

.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 1vh;
    height: 1vh;
    animation: spin 2s linear infinite;
    margin-top: 2%;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  }

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25rem;
    height: 20rem;
}

input {
    width: 17rem;
    height: 2.2rem;
    border-radius: 10px;
    font-size: 1.2rem;
    transition: 150ms ease-in-out;
    &:focus {
        outline: none;
        border-color: white;
        box-shadow: 0 0 20px white;
    }
}

h1 {
    font-size: 4rem;
    text-align: center;
    font-weight: bold;
    color: white;
}

button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    border-radius: 10px;
    border: 2px outset gray;
    cursor: pointer;
    padding: .7rem;
    width: 40%;
    font-size: 1.4rem;
}

/* desktop only */
@media (min-width: 950px) {
    button {
        transition: 200ms ease-in-out;
        &: hover {
            background-color: lightgreen;
            font-weight: bold;
            border-color: lightgreen;
            color: white;
            box-shadow:
            0 0 5px 2.5px #fff,  /* inner white */
            0 0 8px 5px lightgreen,
            0 0 11px 7px lightgreen;
        }
    }
}

/* small laptops */
@media (max-width: 1200px) {
    .wrapper {
        width: 30rem;
        height: 30rem;
    }

    .input-field {
        font-size: 1.6rem;
    }

    form {
        width: 20rem;
        height: 15rem;
    }

    h1 {
        font-size: 3rem;
    }

    input {
        width: 15rem;
        height: 2rem;
        font-size: 1.1rem;
    }
}

/* mobile */
@media (max-width: 710px) {
    .wrapper {
        border: none;
        background: none;
        height: 100vh;
        width: auto;
    }

    .error-message {
        font-size: 1.5rem;
    }

    h1 {
        font-size: 2.5rem;
        text-align: center;
        font-weight: bold;
        color: white;
    }

    form {
        width: 90%;
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
            setLoading(false)
            setError(err.response.data.message)
        })
    }

    return (
        <StyledLogin>
            <div className='wrapper'>
                <h1>Welcome Back, <br/> Buddy!</h1>
                <form onSubmit={handleSubmit}>
                    <div className='input-wrapper'>
                        <label className='input-field'>
                            Username:
                            <input
                            type='text'
                            name='username'
                            placeholder='Username..'
                            value={formValues.username}
                            onChange={handleChange}
                            />
                        </label>
                        <label className='input-field'>
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
                </form>
                {loading && <div className='loader'></div>}
                {error && <h3 className='error-message'>- {error} -</h3>}
            </div>
        </StyledLogin>
    )
}

export default Login
