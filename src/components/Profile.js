import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import RightBar from './RightBar'
import Feed from './Feed'
import styled from 'styled-components'
import LeftProfileBar from './LeftProfileBar'


const StyledContent = styled.div`
display: flex;
height: calc(100vh - 63px);

/* large-tablet */
@media (max-width: 960px) {
    flex-direction: column;
    height: calc(100vh - 63px);
}
`

const Profile = () => {
    const { id } = useParams()

    return (
        <div>
            <NavBar />
            <StyledContent>
                <LeftProfileBar className='leftBar'/>
                <Feed feedEndpoint={`users/${id}/posts`}/>
                <RightBar profileId={id}/>
            </StyledContent>
        </div>
    )
}

export default Profile