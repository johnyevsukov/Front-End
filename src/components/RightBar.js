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
background-color: #6ba6ed;

.header {
    border: 1px solid black;
    width: 100%;
    margin-bottom: 5%;
}
`

const RightBar = () => {
    return (
        <StyledRightBar>
            <div className='header'>
                <h2>My Connections:</h2>
            </div>
            <Following />
            <Followers />
        </StyledRightBar>
    )
}

export default RightBar