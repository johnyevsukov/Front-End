import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledCreatePost = styled.div`
border: 2px outset lightblue;
margin-top: 2%;
margin-bottom: 2%;
width: 70%;
border-radius: 8px;

form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    input {
        width: 40%;
        height: 2vh;
        border-radius: 4px;
        border: 1px solid gray;
    }

    button {
        width: 15%;
        margin-top: 2%;
        margin-bottom: 2%;
    }
}
`

const intialFormValue = {
    post_text: ''
}

const CreatePost = (props) => {
    const [formValue, setFormValue] = useState(intialFormValue)

    const onChange = (e) => {
        const { name, value } = e.target
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post('posts', formValue)
        .then(res => {
            console.log(res.data)
            props.setPosts([
                res.data,
                ...props.posts
            ])
            setFormValue(intialFormValue)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledCreatePost>
            <h3>What's on your mind, Buddy?</h3>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                placeholder='my thoughts..'
                onChange={onChange}
                name='post_text'
                value={formValue.post_text}
                />
                <button>share</button>
            </form>
        </StyledCreatePost>
    )
}

export default CreatePost