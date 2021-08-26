import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'

const StyledEditComment = styled.div`
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: .5rem;
}

input {
    font-size: 1rem;
    width: 10rem;
    height: 1.5rem;
    border-radius: 4px;
    border: 1px solid gray;
    margin-top: .5rem;
    margin-bottom: .7rem;
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

/* mobile */
@media (max-width: 710px) {
    input {
        width: 7rem;
        height: 1rem;
        font-size: .9rem;
    }
}
`

const EditComment = (props) => {
    const { 
        comment,
        setLoading,
        setComment,
        toggleEdit,
        id 
    } = props
    const [formValue, setFormValue] = useState(comment)

    const handleChange = (e) => {
        const { value } = e.target
        setFormValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        axiosWithAuth()
        .put(`comments/${id}`,
        {comment_text: formValue})
        .then(res => {
            setLoading(false)
            toggleEdit()
            setComment(res.data)
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
                name='comment'
                value={formValue}
                onChange={handleChange}
                />
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
        </StyledEditComment>
    )
}

export default EditComment
