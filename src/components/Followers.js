import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import UserCard from './UserCard'


const StyledFollowers = styled.div`
display: flex;
flex-direction: column;
border: 2px solid white;
border-radius: 5px;
width: 90%;
height: 20%;
margin-bottom: 10%;

.connectButton {
    padding-top: 2%;
    padding-bottom: 2%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #3080ff;

    button {
        width: 50%;
        border-radius: 8px;
        border: 1px solid white;
        transition: transform .2s;
        &:hover {
            transform: scale(1.2);
        }
    }

    .unfollow {
        &:hover {
            background-color: pink;
            border: 1px solid red;
        }
    }

    .follow {
        &:hover {
            background-color: lightgreen;
            border: 1px solid green;
        }
    }
}

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
    width: 100%;
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

@media (max-width: 680px) {
    margin-top: 10%;
    height: 89%;
}
`

const Followers = (props) => {
    const { profileId } = props
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`users/${profileId}/followers`)
        .then(res => {
            setLoading(false)
            setFollowers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [profileId])

    const handleUnfollow = () => {
        axiosWithAuth()
        .delete(`users/${userId}/unfollow/${id}`)
        .then(res => {
            setFollowers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleFollow = () => {
        axiosWithAuth()
        .post(`users/${parseInt(userId)}/follow`, {following_id: id})
        .then(res => {
            setFollowers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <StyledFollowers>
            <h3>({followers.length}) Followers:</h3>
            <div className='list'>
            {loading && <div className='loader'></div>}
            {
                followers.map(user => {
                    return <UserCard key={user.user_id} user={user} />
                })
            }
            </div>
            {
                (id !== userId && id !== undefined) &&
                <div className='connectButton'>
                    {
                        (followers.filter(f => 
                            f.user_id === parseInt(userId)).length > 0) ?
                        <button
                        className='unfollow'
                        onClick={handleUnfollow}>
                            unfollow
                        </button> :
                        <button
                        className='follow'
                        onClick={handleFollow}>
                            follow
                        </button>
                    }
                </div>
            }
        </StyledFollowers>
    )
}

export default Followers
