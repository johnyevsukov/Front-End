import React from 'react'
import styled from 'styled-components'
import Post from './Post'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import CreatePost from './CreatePost'


const StyledFeed = styled.div`
border: 2px solid gray;
height: 95vh;
width: 70%;
display: flex;
flex-direction: column;
align-items: center;
overflow: scroll;

.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 1vh;
    height: 1vh;
    animation: spin 2s linear infinite;
    margin-top: 2%;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const Feed = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get('posts/timeline/feed')
        .then(res => {
            console.log(res.data)
            setLoading(false)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <StyledFeed>
            {loading && <div className='loader'></div>}
            <CreatePost posts={posts} setPosts={setPosts}/>
            {
                posts.map(post => {
                    return <Post key={post.post_id} post={post} setPosts={setPosts} posts={posts}/>
                })
            }
        </StyledFeed>
    )
}

export default Feed