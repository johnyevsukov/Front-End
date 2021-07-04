import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledCommentForm = styled.div`
background-color: #f2f2f2;
width: 70%;
border-radius: 5px;
margin-top: 2%;
margin-bottom: 2%;

label {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-weight: bold;
    align-items: center;
    margin-top: 2%;
    margin-bottom: 2%;
}

input {
    margin-top: 1%;
}
`

const initialFormValues = {
    comment_text: '',
    user_id: ''
}

const CommentForm = (props) => {
    const { setError, setLoading } = props
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
        .post(`posts/${props.postId}/comments`, comment)
        .then(res => {
            setLoading(false)
            setFormValues(initialFormValues)
            props.setComments([
                ...props.comments,
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
        <StyledCommentForm>
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
        </StyledCommentForm>
    )
}

export default CommentForm
