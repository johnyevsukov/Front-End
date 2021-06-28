import React from 'react'
import styled from 'styled-components'
import Following from './Following'
import Followers from './Followers'


const StyledRightBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
border: 2px solid gray;
height: 95vh;
width: 30%;
`

const RightBar = () => {
    return (
        <StyledRightBar>
            <Following />
            <Followers />
        </StyledRightBar>
    )
}

export default RightBar