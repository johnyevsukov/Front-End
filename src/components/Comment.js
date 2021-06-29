import React from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledComment = styled.div`
background-color: #f2f2f2;
width: 70%;
border-radius: 10px;
margin-top: 2%;
margin-bottom: 2%;

#name {
    font-weight: bold;
}

.buttonDiv {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: auto;

    button {
        margin-bottom: 8%;
    }
}
`

const Comment = (props) => {
    const { name, text, postUserId, userId, commentUserId } = props

    const handleDelete = () => {
        console.log('delete')
        axiosWithAuth()
        .delete()
        .then(res => {

        })
        .catch(err => {
            
        })
    }

    return (
        <StyledComment>
            <p id='name'>{name} says..</p>
            <p>{text}</p>
            <div className='buttonDiv'>
            {
                ((postUserId === userId) || (commentUserId === userId)) && 
                <button onClick={handleDelete} >delete</button>
            }
            {
                ((commentUserId === userId)) && 
                <button>edit</button>
            }
            </div>
        </StyledComment>
    )
}

export default Comment