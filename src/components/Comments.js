import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import Comment from './Comment'
import CreateComment from './CreateComment'

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
    const { postId, postUserId, userId, setError } = props
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`posts/${postId}/comments`)
        .then(res => {
            setLoading(false)
            setComments(res.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [postId])

    return (
        <StyledComments>
            {
                comments.map(comment => {
                    return <Comment 
                    key={comment.comment_id} 
                    comment={comment}
                    comments={comments} 
                    setComments={setComments} 
                    userId={userId} 
                    postUserId={postUserId} 
                    />
                })
            }
            {loading && <div className='loader'></div>}
            <CreateComment
            postId={postId}
            comments={comments}
            setComments={setComments}
            setLoading={setLoading}
            setError={setError}
            />
        </StyledComments>
    )
}

export default Comments
