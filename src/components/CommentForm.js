import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'


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
`

const initialFormValue = {
    comment_text: ''
}

const CommentForm = () => {
    const [formValue, setFormValue] = useState(initialFormValue)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue({
            ...formValue,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <StyledCommentForm>
            <form>
                <label>
                    comment..
                    <input
                    type='text'
                    name='comment_text'
                    onChange={handleChange}
                    placeholder='say something..'
                    />
                </label>
                <button>comment</button>
            </form>
        </StyledCommentForm>
    )
}

export default CommentForm