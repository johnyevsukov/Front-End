import React from 'react'
import { useEffect, useState } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import styled from 'styled-components'
import Comment from './Comment'

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
        <div>
            {
                comments.map(comment => {
                    return <Comment name={comment.username} text={comment.comment_text}/>
                })
            }
        </div>
    )
}

export default Comments