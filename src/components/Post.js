import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import Comments from './Comments'
import EditPost from './EditPost'
import * as timeago from 'timeago.js'


const StyledPost = styled.div`
border: 2px outset lightblue;
margin-top: 2%;
margin-bottom: 2%;
width: 70%;
border-radius: 8px;

.liked {
    color: blue;
}

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
    margin-top: 3%;
    margin-bottom: 3%;
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
    const [comments, setComments] = useState(false)
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)
    const [edit, setEdit] = useState(false)
    const [error, setError] = useState(false)
    const { push } = useHistory()

    useEffect(() => {
        axiosWithAuth()
        .get(`posts/${post.post_id}/likes`)
        .then(res => {
            setLikes(res.data)
            const likeCheck = res.data.filter(like => {
                return like.user_id === parseInt(localStorage.getItem('user_id'))
            })
            if (likeCheck.length > 0) {
                setLiked(true)
            }
            else {
                setLiked(false)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }, [post.post_id])

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`posts/${post.post_id}`)
        .then(res => {
            props.setPosts(props.posts.filter(p => {
                return p.post_id !== post.post_id
            }))
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggleLike = () => {
        if (!liked) {
            axiosWithAuth()
            .post(`posts/${post.post_id}/likes`, {user_id: localStorage.getItem('user_id')})
            .then(res => {
                console.log(res.data)
                setLikes(res.data)
                setLiked(true)
            })
            .catch(err => {
                console.log(err)
            })
        }
        else {
            axiosWithAuth()
            .delete(`posts/${localStorage.getItem('user_id')}/unlike/${post.post_id}`)
            .then(res => {
                setLikes(res.data)
                setLiked(false)
            })
            .catch(err => {
                console.log(err)
            })
        }
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
                    <h3 onClick={goToUser}>{post.username}:</h3>
                    <p>{post.post_text}</p>
                    <p className='time'>{timeago.format(post.created_at)}</p>
                    {/* {
                        timeago.format(post.created_at) != timeago.format(post.updated_at) &&
                        <p className='time'>{timeago.format(post.updated_at)}</p>
                    } */}
                </div>
                : <EditPost toggleEdit={toggleEdit} username={post.username} post={post.post_text} id={post.post_id} setPost={setPost}/>
            }
            {
                (post.user_id === userId && !edit) &&
                <div className='buttons'>
                    <button onClick={handleDelete} className='delete'>delete ❌</button>
                    <button onClick={toggleEdit} className='edit'>edit ✏️</button>
                </div>
            }
            <div className='more'>
                <span onClick={toggleLike} className={liked ? 'liked' : null}>paws: {likes.length}</span>
                <span onClick={toggleComments}>comments {comments ? '▲' : '▼'}</span>
            </div>
            {error && <h3 className='error'>Oops. This post may have been deleted.</h3>}
            {comments && <Comments setUserId={setUserId} setError={setError} userId={userId} postId={post.post_id} postUserId={post.user_id}/>}
        </StyledPost>
    )
}

export default Post
