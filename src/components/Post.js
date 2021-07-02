import React from 'react'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import styled from 'styled-components'
import Comments from './Comments'
import EditPost from './EditPost'
import * as timeago from 'timeago.js'
import { useHistory } from 'react-router'


const StyledPost = styled.div`
border: 2px outset lightblue;
margin-top: 2%;
margin-bottom: 2%;
width: 70%;
border-radius: 8px;

h3 {
    transition: transform .2s;
    &:hover {
        transform: scale(1.1);
        color: #3b48ff;
        cursor: pointer;
    }
}

.error {
    color: red;
    
}

.time {
    color: gray;
}

.buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    button {
        border-radius: 5px;
        outline: none;
        border: none;
        width: 20%;
    }

    .delete {
        &:hover {
            background-color: pink;
            border: 1px outset red;
        }
    }

    .edit {
        &:hover {
            background-color: #fff78c;
            border: 1px outset #eddd00;
        }
    }
}

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
    const [post, setPost] = useState(props.post)
    const [userId, setUserId] = useState(parseInt(localStorage.getItem('user_id')))
    const [username, setUsername] = useState()
    const [comments, setComments] = useState(false)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)
    const { push } = useHistory()

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
    }, [post.user_id])

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`posts/${post.post_id}`)
        .then(res => {
            props.setPosts(props.posts.filter(p => {
                return p.post_id != post.post_id
            }))
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggleComments = () => {
        setComments(!comments)
    }

    const toggleEdit = () => {
        setEdit(!edit)
    }

    const goToUser = () => {
        push(`/profile/${post.user_id}`)
    }

    return (
        <StyledPost>
            {
                !edit ?
                <div>
                    <h3 onClick={goToUser}>{username}:</h3>
                    <p>{post.post_text}</p>
                    <p className='time'>{timeago.format(post.created_at)}</p>
                    {/* {
                        timeago.format(post.created_at) != timeago.format(post.updated_at) &&
                        <p className='time'>{timeago.format(post.updated_at)}</p>
                    } */}
                </div>
                : <EditPost toggleEdit={toggleEdit} username={username} post={post.post_text} id={post.post_id} setPost={setPost}/>
            }
            {
                (post.user_id == userId && !edit) &&
                <div className='buttons'>
                    <button onClick ={handleDelete} className={'delete'}>delete ❌</button>
                    <button onClick={toggleEdit} className={'edit'}>edit ✏️</button>
                </div>
            }
            <div className='more'>
                <p>likes: 0</p>
                <span onClick={toggleComments}>comments {comments ? '▲' : '▼'}</span>
            </div>
            {error && <h3 className='error'>Oops. This post may have been deleted.</h3>}
            {comments && <Comments setError={setError} userId={userId} postId={post.post_id} postUserId={post.user_id}/>}
        </StyledPost>
    )
}

export default Post