import React from 'react'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import styled from 'styled-components'


const StyledPost = styled.div`
border: 2px solid gray;
overflow: scroll;
margin-top: 2%;
margin-bottom: 2%;
width: 70%;
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
        </StyledPost>
    )
}

export default Post