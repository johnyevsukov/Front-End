import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import Comments from './Comments'
import EditPost from './EditPost'
import * as timeago from 'timeago.js'

const StyledPost = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 2px outset lightblue;
border-radius: 8px;
width: 70%;
max-width: 50rem;
margin-top: 2%;
margin-bottom: 2%;

.post-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1rem;
}

.post-info h3 {
    font-weight: bold;
    font-size: 1.2rem;
    padding: .6rem;
    cursor: pointer;
}

.post-info .post-text {
    text-align: center;
    font-size: 1.1rem;
    padding: .2rem;
    padding-left: .4rem;
    padding-right: .4rem;
    max-width: 30ch;
}

.post-info .time {
    color: #6e6e6e;
    font-size: .9rem;
    padding: .4rem;
}

.edit-delete {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: .6rem;
}

.edit-delete span {
    border: 1px solid lightgray;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    width: 5rem;
    padding: .25rem;
    margin-right: 8px;
    margin-left: 8px;
    cursor: pointer;
    background: #ebebeb;
}

.likes-comments {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: .4rem;
    margin-bottom: 1rem;
}

.likes-comments span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    width: 7rem;
    padding: .1rem;
    padding-bottom: .3rem;
    margin-right: 22px;
    margin-left: 22px;
    cursor: pointer;
}

.likes-comments .comments {
    padding-right: .8rem;
}

.liked {
    color: blue;
}

/* desktop only */
@media (min-width: 950px) {
    .post-info h3 {
        transition: 100ms ease-in-out;
        &: hover {
            color: #3b48ff;
            transform: scale(1.1)
        }
    }

    .edit-delete .delete {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: #FFC0CB;
            border-color: red;
        }
    }

    .edit-delete .edit {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: #FFFF99;
            border-color: #FFD700;
        }
    }

    .likes-comments span {
        &:hover {
            text-decoration: underline;
        }
    }
}

/* mobile */
@media (max-width: 710px) {
    .edit-delete span {
        font-size: .8rem;
        width: 4rem;
        padding: .25rem;
        margin-right: 6px;
        margin-left: 6px;
    }

    .likes-comments span {
        width: 10rem;
        padding: .1rem;
        font-size: .9rem;
        margin-right: 2px;
        margin-left: 2px;
    }
}
`

const Post = (props) => {
    const { posts, setPosts } = props
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
            /* is the userId of who is currently logged
            on inside of the post's likes list? if so
            set liked to true. if not set liked to false */
            const likeCheck = res.data.filter(like => {
                return like.user_id === userId
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
    }, [post.post_id, userId])

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`posts/${post.post_id}`)
        .then(() => {
            setPosts(posts.filter(p => {
                return p.post_id !== post.post_id
            }))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggleLike = () => {
        if (!liked) {
            axiosWithAuth()
            .post(`posts/${post.post_id}/likes`,
            {user_id: localStorage.getItem('user_id')})
            .then(res => {
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
                /* is edit toggled? if so display
                edit post component. if not display
                post information. */
                edit ?
                <EditPost toggleEdit={toggleEdit} username={post.username} post={post.post_text} id={post.post_id} setPost={setPost}/> :
                <div className='post-info'>
                    <h3 onClick={goToUser}>{post.username}:</h3>
                    <p className='post-text'>"{post.post_text}"</p>
                    <p className='time'>{timeago.format(post.created_at)}</p>
                </div>
            }
            {
                /* is the post id === to the current logged
                on user? and edit is not toggled on? if so
                display buttons for deleting and editing
                the post. */
                (post.user_id === userId && !edit) &&
                <div className='edit-delete'>
                    <span onClick={handleDelete} className='delete'>delete ❌</span>
                    <span onClick={toggleEdit} className='edit'>edit ✏️</span>
                </div>
            }
            <div className='likes-comments'>
                <span onClick={toggleLike} className={liked ? 'liked' : null}>paws: {likes.length}</span>
                <span onClick={toggleComments} className='comments'>comments {comments ? '▲' : '▼'}</span>
            </div>
            {error && <h3 className='error'>Oops. This post may have been deleted.</h3>}
            {comments && <Comments setUserId={setUserId} setError={setError} userId={userId} postId={post.post_id} postUserId={post.user_id}/>}
        </StyledPost>
    )
}

export default Post
