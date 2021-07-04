import React from 'react'
import styled from 'styled-components'
import Post from './Post'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import CreatePost from './CreatePost'
import { useParams } from 'react-router-dom'


const StyledFeed = styled.div`
height: 95vh;
width: 80%;
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

  @media (max-width: 680px) {
    width: 100%;
    height: 80vh;
    overflow: scroll;
`

const Feed = (props) => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`${props.feedEndpoint}`)
        .then(res => {
            console.log(res.data)
            setLoading(false)
            setPosts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [props.feedEndpoint])

    return (
        <StyledFeed>
            {
                (id === localStorage.getItem('user_id') || id === undefined) &&
                <CreatePost setLoading={setLoading} posts={posts} setPosts={setPosts}/>
            }
            {loading && <div className='loader'></div>}
            {
                posts.map(post => {
                    return <Post key={post.post_id} post={post} setPosts={setPosts} posts={posts}/>
                })
            }
        </StyledFeed>
    )
}

export default Feed