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
                <Feed feedEndpoint={'posts/timeline/feed'}/>
                <RightBar profileId={localStorage.getItem('user_id')}/>
            </StyledContent>
        </div>
    )
}

export default TimeLine