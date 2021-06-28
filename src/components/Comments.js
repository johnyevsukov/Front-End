import React from 'react'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import styled from 'styled-components'
import Comment from './Comment'


const StyledComments = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

const Comments = (props) => {
    const [comments, setComments] = useState([])
    const { postId } = props

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
                    return <Comment key={comment.comment_id} name={comment.username} text={comment.comment_text}/>
                })
            }
        </StyledComments>
    )
}

export default Comments