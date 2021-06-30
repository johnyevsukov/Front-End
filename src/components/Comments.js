import React from 'react'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import styled from 'styled-components'
import Comment from './Comment'
import CommentForm from './CommentForm'


const StyledComments = styled.div`
display: flex;
flex-direction: column;
align-items: center;

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

const Comments = (props) => {
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    const { postId, postUserId, userId } = props

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`posts/${postId}/comments`)
        .then(res => {
            console.log(res.data)
            setLoading(false)
            setComments(res.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    return (
        <StyledComments>
            {loading && <div className='loader'></div>}
            {
                comments.map(comment => {
                    return <Comment 
                    key={comment.comment_id} 
                    comments={comments} 
                    setComments={setComments} 
                    userId={userId} 
                    postUserId={postUserId} 
                    comment={comment}
                    />
                })
            }
            <CommentForm postId={postId} comments={comments} setComments={setComments} />
        </StyledComments>
    )
}

export default Comments