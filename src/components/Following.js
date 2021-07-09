import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import UserCard from './UserCard'


const StyledFollowing = styled.div`
border: 2px solid white;
border-radius: 5px;
width: 90%;
height: 20%;
margin-bottom: 10%;

.list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    height: 80%;
    overflow: scroll;
}

.loader {
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 1vh;
    height: 1vh;
    animation: spin 2s linear infinite;
    margin: auto;
    margin-top: 2%;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  h3 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20%;
      margin: auto;
      background: linear-gradient(90deg, #6ba6ed, #ffffff);
  }

  @media (max-width: 1300px) {
    height: 30%;
}
`

const Following = (props) => {
    const { profileId } = props
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`users/${profileId}/following`)
        .then(res => {
            setLoading(false)
            setFollowing(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [profileId])

    return (
        <StyledFollowing>
            <h3>({following.length}) Following:</h3>
            <div className='list'>
            {loading && <div className='loader'></div>}
            {
                following.map(user => {
                    return <UserCard key={user.user_id} user={user} />
                })
            }
            </div>
        </StyledFollowing>
    )
}

export default Following
