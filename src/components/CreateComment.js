import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledCreateComment = styled.div`
background-color: #f2f2f2;
width: 22rem;
border-radius: 5px;
margin-top: 2%;
margin-bottom: 6%;

label {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    font-weight: bold;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .8rem;
    padding-bottom: .5rem;
}

input {
    font-size: 1rem;
    width: 10rem;
    height: 1.5rem;
    border-radius: 4px;
    border: 1px solid gray;
    margin: .5rem;
}

button {
    margin-bottom: .5rem;
    width: 5rem;
    border-radius: 5px;
    border: 1px solid black;
    background: white;
    cursor: pointer;
}

/* desktop only */
@media (min-width: 950px) {
    button {
        transition: .2s ease-in-out;
        &:hover {
            background: lightgreen;
            transform: scale(1.1);
            border-radius: 12px;
        }
    }
}

/* mobile */
@media (max-width: 710px) {
    width: 11rem;
    input {
        width: 7rem;
        height: 1rem;
        font-size: .9rem;
    }
}
`

const initialFormValues = {
    comment_text: '',
    user_id: ''
}

const CreateComment = (props) => {
    const {
        setError,
        setLoading,
        setComments,
        comments,
        postId
    } = props
    const [formValues, setFormValues] = useState(initialFormValues)
    const userId = parseInt(localStorage.getItem('user_id'))

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const comment = {
            ...formValues,
            user_id: userId
        }
        setLoading(true)
        axiosWithAuth()
        .post(`posts/${postId}/comments`, comment)
        .then(res => {
            setLoading(false)
            setFormValues(initialFormValues)
            setComments([
                ...comments,
                res.data
            ])
        })
        .catch(err => {
            setError(true)
            setFormValues(initialFormValues)
            console.log(err.response)
        })
    }

    return (
        <StyledCreateComment>
            <form onSubmit={handleSubmit}>
                <label>
                    comment..
                    <input
                    type='text'
                    name='comment_text'
                    placeholder='say something..'
                    value={formValues.comment_text}
                    onChange={handleChange}
                    />
                </label>
                <button>comment</button>
            </form>
        </StyledCreateComment>
    )
}

export default CreateComment
