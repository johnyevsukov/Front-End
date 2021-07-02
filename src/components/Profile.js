import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import RightBar from './RightBar'
import Feed from './Feed'
import styled from 'styled-components'
import LeftBarProfile from './LeftBarProfile'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledContent = styled.div`
display: flex;
`

const Profile = () => {
    const { id } = useParams()

    return (
        <div>
            <NavBar />
            <StyledContent>
                <LeftBarProfile />
                <Feed feedEndpoint={`users/${id}/posts`}/>
                <RightBar profileId={id}/>
            </StyledContent>
        </div>
    )
}

export default Profile