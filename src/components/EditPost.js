import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledEditPost = styled.div`
display: flex;
flex-direction: column;
align-items: center;

.buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: .6rem;
    margin-top: .4rem;
}

button {
    border: 1px solid lightgray;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    width: 5rem;
    padding: .25rem;
    margin-right: 8px;
    margin-left: 8px;
    cursor: pointer;
    background: #ebebeb;
}

h3 {
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 1rem;
    padding: .6rem;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
}

input {
    font-size: 1rem;
    width: 17rem;
    height: 1.5rem;
    border-radius: 4px;
    border: 1px solid gray;
}

/* desktop only */
@media (min-width: 950px) {
    .submit {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: lightgreen;
            border-color: green;
        }
    }

    .cancel {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: #FFC0CB;
            border-color: red;
        }
    }
}

/* mobile */
@media (max-width: 710px) {
    input {
        width: 10rem;
    }
}
`

const EditPost = (props) => {
    const { post, setPost, toggleEdit, username, id } = props
    const [formValue, setFormValue] = useState(post)

    const handleChange = (e) => {
        const { value } = e.target
        setFormValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .put(`posts/${id}`, {post_text: formValue})
        .then(res => {
            setPost(res.data)
            toggleEdit()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledEditPost>
            <h3>{username}:</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='post'
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
        </StyledEditPost>
    )
}

export default EditPost
