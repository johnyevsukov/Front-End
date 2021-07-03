import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import { useParams } from 'react-router-dom'


const StyledEditProfile = styled.div`
form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
}

label {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    text-align: left;
}
`

const EditProfile = (props) => {
    const { user } = props
    const [formValues, setFormValues] = useState(user)
    const { id } = useParams()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put(`users/${id}`, formValues)
        .then(res => {
            res.data.user_birthday ?
            props.setUser({
                ...res.data,
                user_birthday: res.data.user_birthday.slice(0, 10)
            }) :
            props.setUser(res.data)
            props.toggleEdit()
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return (
        <StyledEditProfile>
            <h3>About me:</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Species:
                    <input
                    type='text'
                    placeholder='My species..'
                    value={formValues.user_species}
                    name='user_species'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Location:
                    <input
                    type='text'
                    placeholder='My location..'
                    value={formValues.user_location}
                    name='user_location'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Birthday:
                    <input
                    type='text'
                    placeholder='My birthday..'
                    value={formValues.user_birthday}
                    name='user_birthday'
                    onChange={handleChange}
                    />
                </label>
                <div className='buttons'>
                    <button type='submit' className='submit'>submit</button>
                    <button type='button' className='cancel' onClick={props.toggleEdit}>cancel</button>
                </div>
            </form>
            <p>contact me at: {user.user_email}</p>
        </StyledEditProfile>
    )
}

export default EditProfile