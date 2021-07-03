import React, { useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import EditComment from './EditComment'


const StyledComment = styled.div`
background-color: #f2f2f2;
width: 70%;
border-radius: 10px;
margin-top: 2%;
margin-bottom: 2%;

.name {
    font-weight: bold;
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

.buttonDiv {
    display: flex;
    flex-direction: column;
    width: 30%;
    margin: auto;

    button {
        margin-bottom: 8%;
        border-radius: 5px;
        outline: none;
        border: 1px solid gray;
        background-color: white;
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
            <p className='name'>{comment.username} says..</p>
            {
                !edit ? 
                <p>{comment.comment_text}</p>
                : <EditComment 
                    id={comment.comment_id}
                    comment={comment.comment_text}
                    toggleEdit={toggleEdit}
                    setComment={setComment}
                    setLoading={setLoading}
                    />
            }
            {
                !edit &&
                <div className='buttonDiv'>
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
