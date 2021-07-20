import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'


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

.buttons {
    button {
        margin-top: 5%;
        margin-bottom: 2%;
    }

    .submit {
        &:hover {
            background-color: lightgreen;
            border: 1px solid green;
        }
    }

    .cancel {
        &:hover {
            background-color: pink;
            border: 1px solid red;
        }
    }
}
`

const EditProfile = (props) => {
    const { user, setUser, toggleEdit } = props
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
            setUser({
                ...res.data,
                user_birthday: res.data.user_birthday.slice(0, 10)
            }) :
            setUser(res.data)
            toggleEdit()
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    return (
        <StyledEditProfile>
            {/* <h3>About me:</h3> */}
            <form onSubmit={handleSubmit}>
                <label>
                    Avatar:
                    <select onChange={handleChange} value={formValues.user_avatar} name='user_avatar'>
                        <option value=''>- Select an Avatar -</option>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                        <option value='rodent'>Rodent</option>
                        <option value='hamster'>Hamster</option>
                        <option value='lizard'>Lizard</option>
                    </select>
                </label>
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
                    placeholder='YYYY-MM-DD'
                    value={formValues.user_birthday}
                    name='user_birthday'
                    onChange={handleChange}
                    />
                </label>
                <div className='buttons'>
                    <button
                    type='submit'
                    className='submit'>
                        submit
                    </button>
                    <button
                    type='button'
                    className='cancel'
                    onClick={toggleEdit}>
                        cancel
                    </button>
                </div>
            </form>
            <p>contact me at: {user.user_email}</p>
        </StyledEditProfile>
    )
}

export default EditProfile
