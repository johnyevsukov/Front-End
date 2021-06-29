import React from 'react'
import styled from 'styled-components'
import Post from './Post'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledFeed = styled.div`
border: 2px solid gray;
height: 95vh;
width: 70%;
display: flex;
flex-direction: column;
align-items: center;
overflow: scroll;
`

const Feed = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axiosWithAuth()
        .get('posts/timeline/feed')
        .then(res => {
            console.log(res.data)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <StyledFeed>
            {
                posts.map(post => {
                    return <Post key={post.post_id} post={post} setPosts={setPosts} posts={posts}/>
                })
            }
        </StyledFeed>
    )
}

export default Feed