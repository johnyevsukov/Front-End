import React, { useState } from 'react'
import styled from 'styled-components'
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
        transition: .2s transform ease-in-out;
        border-radius: 8px;
        border: 1px solid gray;
        &:hover {
            transform: scale(1.2);
            background-color: lightgreen;
            border-radius: 6px;
        }
    }
}
`

const intialFormValue = {
    post_text: ''
}

const CreatePost = (props) => {
    const { posts, setPosts, setLoading } = props
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
        setLoading(true)
        axiosWithAuth()
        .post('posts', formValue)
        .then(res => {
            setLoading(false)
            setPosts([
                res.data,
                ...posts
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
                name='post_text'
                placeholder='my thoughts..'
                value={formValue.post_text}
                onChange={onChange}
                />
                <button>share</button>
            </form>
        </StyledCreatePost>
    )
}

export default CreatePost
