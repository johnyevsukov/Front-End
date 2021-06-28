import React from 'react'
import styled from 'styled-components'


const StyledComment = styled.div`
background-color: #f2f2f2;
width: 70%;
border-radius: 10px;
margin-top: 2%;
margin-bottom: 2%;

#name {
    font-weight: bold;
}
`

const Comment = (props) => {
    const { name, text } = props

    return (
        <StyledComment>
            <p id='name'>{name} says..</p>
            <p>{text}</p>
        </StyledComment>
    )
}

export default Comment