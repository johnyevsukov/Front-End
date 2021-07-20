import React from 'react'
import styled from 'styled-components'
import Following from './Following'
import Followers from './Followers'


const StyledRightBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: calc(100vh - 63px);
width: 20%;
background-color: #6ba6ed;
overflow: scroll;
border-left: 2px solid #6ba6ed;

.header {
    width: 100%;
    margin-bottom: 5%;
    h2 {
        font-size: large;
        padding-top: 1%;
        padding-bottom: 1%;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        margin: 0;
        background-color: white;
    }
}

@media (max-width: 680px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 20vh;
    overflow: scroll;

    .header {
        display: none;
    }

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