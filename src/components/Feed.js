import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import Post from './Post'
import CreatePost from './CreatePost'

const StyledFeed = styled.div`
height: 100%;
width: 76%;
display: flex;
flex-direction: column;
align-items: center;
overflow: scroll;
background: #fcfcfc; /* slightly off white */
// background: #f8f8ff; /* blue-ish off white */

.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 1vh;
    height: 1vh;
    animation: spin 2s linear infinite;
    margin-top: 2%;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
  }

/* large-tablet */
@media (max-width: 960px) {
    width: 100%;
    height: 70%;
}
`

const Feed = (props) => {
    const { feedEndpoint } = props
    const { id } = useParams()
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(feedEndpoint)
        .then(res => {
            setLoading(false)
            setPosts(res.data)
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }, [feedEndpoint])

    /* wip for post pagination.
    have you reach the bottom of the page?
    if so load more posts. */
    const handlePagination = (e) =>
    {
        const { target } = e;
        if (target.scrollHeight - target.scrollTop === target.clientHeight)
        {
            console.log('load more');
        }
    };

    return (
        <StyledFeed onScroll={handlePagination}>
            {
                /* is the param id === to the local
                storage user_id set on login? if so you
                are on your own page and can create a post.
                is the param id === undefined? if so you are
                on your news feed and you can also create a post */
                (id === userId || id === undefined) &&
                <CreatePost
                setLoading={setLoading}
                posts={posts}
                setPosts={setPosts}
                />
            }
            {loading && <div className='loader'></div>}
            {
                posts.map(post => {
                    return <Post 
                            key={post.post_id}
                            post={post}
                            setPosts={setPosts}
                            posts={posts}
                            />
                })
            }
        </StyledFeed>
    )
}

export default Feed
