import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const initialFormValues = {
    username: '',
    password: ''
}

const Login = () => {
    const [formValues, setFormValues] = useState(initialFormValues)

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
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='username'
                value={formValues.username}
                onChange={handleChange}
                placeholder='Username..'
                />
                <input
                type='text'
                name='password'
                value={formValues.password}
                onChange={handleChange}
                placeholder='Password..'
                />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login