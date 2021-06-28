import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'


const StyledEditPost = styled.div`
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
`

const EditPost = (props) => {
    const [formValue, setFormValue] = useState(props.post)

    const handleChange = (e) => {
        const { value } = e.target
        setFormValue(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submit')
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
                    <button type='submit'>submit</button>
                    <button type='button' onClick={props.toggleEdit}>cancel</button>
                </div>
            </form>
        </StyledEditPost>
    )
}

export default EditPost