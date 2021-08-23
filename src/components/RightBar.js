import React from 'react'
import styled from 'styled-components'
import Following from './Following'
import Followers from './Followers'


const StyledRightBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 100%;
width: 22%;
background-color: #6ba6ed;
overflow: scroll;
border-left: 2px solid #1f7ced;

.connections-header {
    width: 100%;
    margin-bottom: 5%;
    font-size: large;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    background-color: white;
    padding: .5rem;
}

h2 {
    font-weight: bold;
    text-align: center;
}

/* large-desktop */
@media (min-width: 1850px) {
    h2 {
        font-size: 1.7rem;
    }
}

/* large-tablet */
@media (max-width: 960px) {
    width: 100%;
    height: 30%;
    flex-direction: row;
    justify-content: space-around;

    .connections-header {
        display: none;
    }
}

/* mobile */
@media (max-width: 710px) {
    border-left: none;
}
`

const RightBar = (props) => {
    const { profileId } = props

    return (
        <StyledRightBar>
            <div className='connections-header'>
                <h2>Connections:</h2>
            </div>
            <Following profileId={profileId}/>
            <Followers profileId={profileId}/>
        </StyledRightBar>
    )
}

export default RightBar