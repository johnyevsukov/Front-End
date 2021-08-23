import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import EditComment from './EditComment'
import * as timeago from 'timeago.js'


const StyledComment = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: #f2f2f2;
width: 22rem;
border-radius: 10px;
margin-top: 2%;
margin-bottom: 2%;

.name {
    font-weight: bold;
    padding: .5rem;
    padding-top: .8rem;
}

.comment-text {
    padding: .4rem;
}

.time {
    color: #6e6e6e;
    font-size: .9rem;
    padding: .2rem;
    padding-bottom: .8rem;
}

.buttons {
    display: flex;
    flex-direction: column;
    padding: .2rem;
}

button {
    margin-bottom: .5rem;
    width: 5rem;
    border-radius: 5px;
    border: 1px solid black;
    background: white;
    cursor: pointer;
}

.loader {
    border: 8px solid #3498db;
    border-top: 8px solid #f2f2f2;
    border-radius: 50%;
    width: .5vh;
    height: .5vh;
    animation: spin 1s linear infinite;
    margin: auto;
    margin-bottom: 2%;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
}

p {
    text-align: center;
}

/* desktop only */
@media (min-width: 950px) {
    .delete {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: #FFC0CB;
            border-color: red;
        }
    }

    .edit {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: #FFFF99;
            border-color: #FFD700;
        }
    }
}

/* mobile */
@media (max-width: 710px) {
    width: 11rem;
}
`

const Comment = (props) => {
    const { postUserId, userId, comments, setComments } = props
    const [comment, setComment] = useState(props.comment)
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleDelete = () => {
        setLoading(true)
        axiosWithAuth()
        .delete(`comments/${comment.comment_id}`)
        .then(() => {
            setComments(comments.filter(c => {
                return c.comment_id !== comment.comment_id
            }))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggleEdit = () => {
        setEdit(!edit)
    }

    return (
        <StyledComment>
            <h3 className='name'>{comment.username} says..</h3>
            {
                edit ?
                <EditComment 
                    id={comment.comment_id}
                    comment={comment.comment_text}
                    toggleEdit={toggleEdit}
                    setComment={setComment}
                    setLoading={setLoading}
                    /> :
                <div>
                    <p className='comment-text'>"{comment.comment_text}"</p>
                    <p className='time'>{timeago.format(comment.created_at)}</p>
                </div> 
            }
            {
                !edit &&
                <div className='buttons'>
                {
                    ((postUserId === userId) || (comment.user_id === userId)) && 
                    <button onClick={handleDelete} className='delete' >delete</button>
                }
                {
                    ((comment.user_id === userId)) && 
                    <button onClick={toggleEdit} className='edit' >edit</button>
                }
                </div>
            }
            {loading && <div className='loader'></div>}
        </StyledComment>
    )
}

export default Comment
