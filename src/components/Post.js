import React from 'react'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import styled from 'styled-components'
import Comments from './Comments'
import EditPost from './EditPost'
import * as timeago from 'timeago.js'


const StyledPost = styled.div`
border: 2px outset lightblue;
margin-top: 2%;
margin-bottom: 2%;
width: 70%;
border-radius: 8px;

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
    const [userId, setUserId] = useState(1)
    const [username, setUsername] = useState()
    const [comments, setComments] = useState(false)
    const [edit, setEdit] = useState(false)

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

    return (
        <StyledPost>
            {
                !edit ?
                <div>
                    <h3>{username}:</h3>
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
            {comments && <Comments userId={userId} postId={post.post_id} postUserId={post.user_id}/>}
        </StyledPost>
    )
}

export default Post