import React from 'react'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import styled from 'styled-components'


const StyledPost = styled.div`
border: 2px solid gray;
margin-top: 2%;
margin-bottom: 2%;
width: 70%;
border-radius: 8px;

.more {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    span {
        &:hover {
            color: blue;
            font-size: large;
        }
    }
}
`

const Post = (props) => {
    const { post } = props
    const [username, setUsername] = useState()

    useEffect(() => {
        axiosWithAuth()
        .get(`users/${post.user_id}`)
        .then(res => {
            console.log(res.data)
            setUsername(res.data.username)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <StyledPost>
            <h3>{username}:</h3>
            <p>{post.post_text}</p>
            <div className='more'>
                <p>likes: 0</p>
                <span>comments</span>
            </div>
        </StyledPost>
    )
}

export default Post