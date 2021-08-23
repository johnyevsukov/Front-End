import React from 'react'
import NavBar from './NavBar'
import RightBar from './RightBar'
import StyledLeftTimeLineBar from './LeftTimeLineBar'
import Feed from './Feed'
import styled from 'styled-components'


const StyledTimeLine = styled.div`
display: flex;
height: calc(100vh - 63px);

@media (max-width: 680px) {
    flex-direction: column;
}
`

const TimeLine = () => {
    const userId = localStorage.getItem('user_id');
    const feedEndPoint = 'posts/timeline/feed'

    return (
        <div>
            <NavBar />
            <StyledTimeLine>
                <StyledLeftTimeLineBar />
                <Feed feedEndpoint={feedEndPoint}/>
                <RightBar profileId={userId}/>
            </StyledTimeLine>
        </div>
    )
}

export default TimeLine
