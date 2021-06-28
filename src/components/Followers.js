import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import UserCard from './UserCard'


const StyledFollowers = styled.div`
border: 2px solid gray;
width: 90%;
height: 20%;
overflow: scroll;

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

const Followers = () => {
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`users/${1}/followers`)
        .then(res => {
            console.log(res.data)
            setLoading(false)
            setFollowers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <StyledFollowers>
            <h3>({followers.length}) Followers:</h3>
            {
                followers.map(user => {
                    return <UserCard key={user.user_id} user={user} />
                })
            }
            {loading && <div className='loader'></div>}
        </StyledFollowers>
    )
}

export default Followers