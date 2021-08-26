import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import schema from "../validation/signupSchema";
import * as yup from "yup";

const StyledRegister = styled.div`
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
    height: 90%;
}

.input-field {
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
}

.error {
    color: white;
    font-weight: bold;
    margin-top: .2rem;
    margin-bottom: 1rem;
}

.loader {
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: .5rem;
    height: .5rem;
    animation: spin 2s linear infinite;
    margin-top: .5rem;
    margin-bottom: .5rem;

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
    width: 29rem;
    height: 29rem;
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
    font-size: 3.5rem;
    text-align: center;
    font-weight: bold;
    color: white;
    padding: 1rem;
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
    width: 60%;
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
@media (max-width: 1270px) {
    .wrapper {
        width: 30rem;
        height: 30rem;
    }

    .input-field {
        font-size: 1.4rem;
    }

    .error {
        font-weight: bold;
        margin-top: .1rem;
        margin-bottom: 0;
    }

    form {
        width: 25rem;
        height: 20rem;
    }

    h1 {
        margin-bottom: .7rem;
        font-size: 2.3rem;
    }

    input {
        width: 14rem;
        height: 2rem;
        font-size: 1rem;
    }

    button {
        margin-top: 1rem;
        font-size: 
        width: 50%;
        padding: .5rem;
        font-size: 1.2rem;
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

    .error {
        width: 20ch;
        text-align: center;
        margin-bottom: .6rem;
    }

    .loader {
        margin-top: 1.8rem;
    }

    h1 {
        font-size: 1.9rem;
        text-align: center;
        font-weight: bold;
        color: white;
        margin-bottom: 4rem;
    }

    button {
        margin-top: 2.5rem;
        border: none;
        background: white;
    }

    form {
        width: 90%;
    }
}
`


const initialFormValues = {
    user_email: '',
    username: '',
    password: '',
    re_password: ''
}

const initialFormErrors = {
    user_email: '',
    username: '',
    password: '',
    re_password: ''
  };

const initialDisabled = true;

const Register = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [formErrors, setFormErrors] = useState(initialFormErrors);
    const [disabled, setDisabled] = useState(initialDisabled);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState('')
    const { push } = useHistory()

    const handleChange = (e) => {
        const { name, value } = e.target

        yup
        .reach(schema, name)
        .validate(value)
        .then(() => {
            setFormErrors({
            ...formErrors,
            [name]: "",
            });
        })
        .catch((err) => {
            setFormErrors({
            ...formErrors,
            [name]: err.errors[0],
            });
        });
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('https://pet-post.herokuapp.com/api/auth/register', {
            username: formValues.username,
            password: formValues.password,
            user_email: formValues.user_email
        })
        .then(res => {
            setLoading(false)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_id', res.data.user_id)
            push(`/profile/${res.data.user_id}`)
        })
        .catch(err => {
            setLoading(false)
            setApiError(err.response.data.message)
        })
    }

    useEffect(() => {
        schema.isValid(formValues)
        .then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

    return (
        <StyledRegister>
            <div className='wrapper'>
                <h1>Oh Boy! <br/> Glad You're Joining!</h1>
                <form onSubmit={handleSubmit}>
                    <div className='input-wrapper'>
                        <label className='input-field'>
                            Email:
                            <input
                            type='text'
                            placeholder='Email..'
                            name='user_email'
                            value={formValues.user_email}
                            onChange={handleChange}
                            />
                        </label>
                        <div className='error'>{formErrors.user_email}</div>
                        <label className='input-field'>
                            Username:
                            <input
                            type='text'
                            placeholder='Username..'
                            name='username'
                            value={formValues.username}
                            onChange={handleChange}
                            />
                        </label>
                        <div className='error'>{formErrors.username}</div>
                        <label className='input-field'>
                            Password:
                            <input
                            type='password'
                            placeholder='Password..'
                            name='password'
                            value={formValues.password}
                            onChange={handleChange}
                            />
                        </label>
                        <div className='error'>{formErrors.password}</div>
                        <label className='input-field'>
                            Re-enter Password:
                            <input
                            type='password'
                            placeholder='Password..'
                            name='re_password'
                            value={formValues.re_password}
                            onChange={handleChange}
                            />
                        </label>
                        <div className='error'>{formErrors.re_password}</div>
                    </div>
                    <button disabled={disabled}>Create Account!</button>
                </form>
                <div className='error'>{apiError}</div>
                {loading && <div className='loader'></div>}
            </div>
        </StyledRegister>
    )
}

export default Register
