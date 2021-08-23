import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledCreatePost = styled.div`
border: 2px outset lightblue;
margin-top: 2%;
margin-bottom: 2%;
width: 70%;
max-width: 50rem;
border-radius: 8px;

h3 {
    margin-top: .5rem;
    text-align: center;
    padding: 1.1rem;
    padding-bottom: 1.2rem;
    font-weight: bold;
    font-size: 1.4rem;
}

form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: .2rem;

input {
    width: 17rem;
    height: 1.5rem;
    border-radius: 4px;
    border: 1px solid gray;
}

button {
    padding: .2rem;
    width: 8rem;
    margin-top: 2%;
    margin-bottom: 2%;
    border-radius: 8px;
    border: 1px solid gray;
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
            font-weight: bold;
        }
    }
}

/* mobile */
@media (max-width: 710px) {
    button {
        margin: .7rem;
    }

    input {
        width: 10rem;
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
            <h3 className='prompt'>What's on your mind, Buddy?</h3>
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
