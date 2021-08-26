import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import schema from "../validation/editProfileSchema";
import * as yup from "yup";

const StyledEditProfile = styled.div`
form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
}

label {
    padding: .1rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: auto;
    text-align: left;
}

.error {
    color: white;
    font-weight: bold;
    padding: .2rem;
}

.avatar-error {
    text-align: center;
    padding-bottom: .8rem;
}

.avatar-label {
    text-align: center;
    padding-top: .3rem;
    padding-bottom: 1rem;
}

.buttons {
    display: flex;
    flex-direction: row !important;
    justify-content: center;
}

.buttons button {
    font-size: .9rem;
    cursor: pointer;
    border: 1px solid black;
    margin: .4rem;
    margin-top: 1rem;
    border-radius: 5px;
    padding: .4rem;
    width: 4rem;
}

input {
    height: 1.2rem;
    border-radius: 5px;
    border: 1px solid gray;
}

select {
    height: 1.4rem;
    border-radius: 5px;
}

/* desktop only */
@media (min-width: 950px) {
    .cancel {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: pink;
            border-color: red;
        }
    }

    .submit {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: lightgreen;
            border-color: green;
        }
    }
}
`

const initialFormErrors = {
    user_avatar: '',
    user_species: '',
    user_location: '',
    user_birthday: ''
  };

const initialDisabled = true;

const EditProfile = (props) => {
    const { user, setUser, toggleEdit } = props
    const [formValues, setFormValues] = useState(user)
    const [formErrors, setFormErrors] = useState(initialFormErrors)
    const [disabled, setDisabled] = useState(initialDisabled)
    const { id } = useParams()

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

    useEffect(() => {
        schema.isValid(formValues)
        .then((valid) => {
            setDisabled(!valid);
        });
    }, [formValues]);

    return (
        <StyledEditProfile>
            <form onSubmit={handleSubmit}>
                <label className='avatar-label'>
                    Avatar:
                    <select onChange={handleChange} value={formValues.user_avatar} name='user_avatar'>
                        <option value=''>- Select an Avatar -</option>
                        <option value='dog'>Dog</option>
                        <option value='cat'>Cat</option>
                        <option value='hamster'>Hamster</option>
                        <option value='lizard'>Lizard</option>
                        <option value='bird'>Bird</option>
                        <option value='frog'>Frog</option>
                        <option value='rodent'>Rodent</option>
                        <option value='fish'>Fish</option>
                        <option value='spider'>Spider</option>
                        <option value='turtle'>Turtle</option>
                        <option value='snake'>Snake</option>
                        <option value='duck'>Duck</option>
                        <option value='hedgehog'>Hedgehog</option>
                        <option value='horse'>Horse</option>
                        <option value='monkey'>Monkey</option>
                        <option value='rabbit'>Rabbit</option>
                        <option value='pig'>Pig</option>
                    </select>
                </label>
                {formErrors.user_avatar && <div className='error avatar-error'>{formErrors.user_avatar}</div>}
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
                {formErrors.user_species && <div className='error'>{formErrors.user_species}</div>}
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
                {formErrors.user_location && <div className='error'>{formErrors.user_location}</div>}
                <label>
                    Birthday:
                    <input
                    type='date'
                    placeholder='YYYY-MM-DD'
                    value={formValues.user_birthday}
                    name='user_birthday'
                    onChange={handleChange}
                    />
                </label>
                {formErrors.user_birthday && <div className='error'>{formErrors.user_birthday}</div>}
                <div className='buttons'>
                    <button
                    type='submit'
                    className='submit'
                    disabled={disabled}>
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
        </StyledEditProfile>
    )
}

export default EditProfile
