import React from 'react'
import NavBar from './NavBar'
import RightBar from './RightBar'
import Feed from './Feed'
import styled from 'styled-components'


const StyledContent = styled.div`
display: flex;
`

const TimeLine = () => {
    return (
        <div>
            <NavBar />
            <StyledContent>
                <Feed />
                <RightBar />
            </StyledContent>
        </div>
    )
}

export default TimeLine