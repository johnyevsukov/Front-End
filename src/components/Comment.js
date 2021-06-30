import React from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import { useState } from 'react'
import EditComment from './EditComment'


const StyledComment = styled.div`
background-color: #f2f2f2;
width: 70%;
border-radius: 10px;
margin-top: 2%;
margin-bottom: 2%;

#name {
    font-weight: bold;
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
    const [edit, setEdit] = useState(false)
    const [comment, setComment] = useState(props.comment)
    const { postUserId, userId, comments, setComments } = props

    const handleDelete = () => {
        console.log('delete')
        axiosWithAuth()
        .delete(`comments/${comment.comment_id}`)
        .then(res => {
            console.log(res)
            setComments(comments.filter(c => {
                return c.comment_id != comment.comment_id
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
            <p id='name'>{comment.username} says..</p>
            {!edit ? <p>{comment.comment_text}</p> : <EditComment id={comment.comment_id} comment={comment.comment_text} toggleEdit={toggleEdit} setComment={setComment}/>}
            {!edit &&
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
        </StyledComment>
    )
}

export default Comment