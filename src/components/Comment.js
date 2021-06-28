import React from 'react'
import styled from 'styled-components'


const StyledComment = styled.div`
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