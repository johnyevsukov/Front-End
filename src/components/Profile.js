import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import RightBar from './RightBar'
import Feed from './Feed'
import styled from 'styled-components'
import UserAbout from './UserAbout'


const StyledContent = styled.div`
display: flex;

.profile {
    display: flex;
    flex-direction: column;
    width: 70%;
}
`

const Profile = () => {
    const { id } = useParams()

    return (
        <div>
            <NavBar />
            <StyledContent>
                <div className='profile'>
                    <UserAbout />
                    <Feed feedEndpoint={`users/${id}/posts`}/>
                </div>
                <RightBar profileId={id}/>
            </StyledContent>
        </div>
    )
}

export default Profile