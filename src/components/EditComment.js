import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledEditComment = styled.div`
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
        background-color: white;
        border-radius: 5px;
        border: 1px solid gray;
        width: 20%;
        margin-top: 1%;
        margin-bottom: 1%;
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

const EditComment = (props) => {
    const [formValue, setFormValue] = useState(props.comment)

    const handleChange = (e) => {
        const { value } = e.target
        setFormValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put(`comments/${props.id}`, {comment_text: formValue})
        .then(res => {
            props.setComment(res.data)
            props.toggleEdit()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledEditComment>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                value={formValue}
                name='comment'
                onChange={handleChange}
                />
                <div className='buttons'>
                    <button type='submit' className='submit'>submit</button>
                    <button type='button' className='cancel' onClick={props.toggleEdit}>cancel</button>
                </div>
            </form>
        </StyledEditComment>
    )
}

export default EditComment