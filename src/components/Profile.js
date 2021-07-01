import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import RightBar from './RightBar'
import Feed from './Feed'
import styled from 'styled-components'


const StyledContent = styled.div`
display: flex;
`

const Profile = () => {
    const { id } = useParams()

    return (
        <div>
            <NavBar />
            <StyledContent>
                <Feed feedEndpoint={`users/${id}/posts`}/>
                <RightBar profileId={id}/>
            </StyledContent>
        </div>
    )
}

export default Profile