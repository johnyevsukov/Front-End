import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledEditPost = styled.div`
form {
    input {
        height: 2vh;
        border-radius: 5px;
        font-size: 95%;
        border: 1px outset gray;
    }
}

.buttons {
    display: flex;
    justify-content: space-evenly;
    flex-direction:column;
    align-items: center;

    button {
        border-radius: 5px;
        outline: none;
        border: none;
        width: 20%;
        margin-top: 3%;
    }
}

.submit {
    &:hover {
        background-color: lightgreen;
        border: 1px outset green;
    }
}

.cancel {
    &:hover {
        background-color: pink;
        border: 1px outset red;
    }
}
`

const EditPost = (props) => {
    const [formValue, setFormValue] = useState(props.post)

    const handleChange = (e) => {
        const { value } = e.target
        setFormValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put(`posts/${props.id}`, {post_text: formValue})
        .then(res => {
            props.setPost(res.data)
            props.toggleEdit()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledEditPost>
            <h3>{props.username}:</h3>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                value={formValue}
                name='post'
                onChange={handleChange}
                />
                <div className='buttons'>
                    <button type='submit' className='submit'>submit</button>
                    <button type='button' className='cancel' onClick={props.toggleEdit}>cancel</button>
                </div>
            </form>
        </StyledEditPost>
    )
}

export default EditPost