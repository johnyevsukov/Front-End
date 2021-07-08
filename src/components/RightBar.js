import React from 'react'
import styled from 'styled-components'
import Following from './Following'
import Followers from './Followers'


const StyledRightBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 95vh;
width: 20%;
background-color: #6ba6ed;
overflow: scroll;

.header {
    width: 100%;
    margin-bottom: 5%;
    h2 {
    }
}

@media (max-width: 680px) {
    width: 100%;
    height: 20vh;
    overflow: scroll;

    h2 {
        margin-top: .5%;
        margin-bottom: .5%;
    }

    h3 {
        margin-top: 0;
    }
`

const RightBar = (props) => {
    const { profileId } = props

    return (
        <StyledRightBar>
            <div className='header'>
                <h2>Connections:</h2>
            </div>
            <Following profileId={profileId}/>
            <Followers profileId={profileId}/>
        </StyledRightBar>
    )
}

export default RightBar