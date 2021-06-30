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
`

const Comments = (props) => {
    const [comments, setComments] = useState([])
    const { postId, postUserId, userId } = props

    useEffect(() => {
        axiosWithAuth()
        .get(`posts/${postId}/comments`)
        .then(res => {
            console.log(res.data)
            setComments(res.data)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    return (
        <StyledComments>
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