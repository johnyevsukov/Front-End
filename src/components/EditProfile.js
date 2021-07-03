import React, { useState } from 'react'
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
`

const EditProfile = (props) => {
    const { user } = props
    const [formValues, setFormValues] = useState(user)

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
        .put('')
        .then(res => {

        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledEditProfile>
            <h3>About me:</h3>
            <form>
                <label>
                    Species:
                    <input
                    type='text'
                    placeholder='My species..'
                    value={user.user_species}
                    name='user_species'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Location:
                    <input
                    type='text'
                    placeholder='My location..'
                    value={user.user_location}
                    name='user_location'
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Birthday:
                    <input
                    type='text'
                    placeholder='My birthday..'
                    value={user.user_birthday}
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