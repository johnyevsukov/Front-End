import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import axiosWithAuth from '../Utils/axiosWithAuth'
import UserCard from './UserCard'
import { useParams } from 'react-router-dom'


const StyledFollowers = styled.div`
border: 2px solid white;
border-radius: 5px;
width: 90%;
height: 20%;
margin-bottom: 10%;

.connectButton {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
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
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    margin: auto;
    background: linear-gradient(90deg, #6ba6ed, #ffffff);
}
`

const Followers = (props) => {
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setLoading(true)
        axiosWithAuth()
        .get(`users/${props.profileId}/followers`)
        .then(res => {
            console.log(res.data)
            setLoading(false)
            setFollowers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [props.profileId])

    const handleUnfollow = () => {
        axiosWithAuth()
        .delete(`users/${localStorage.getItem('user_id')}/unfollow/${id}`)
        .then(res => {
            setFollowers(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleFollow = () => {
        axiosWithAuth()
        .post(`users/${parseInt(localStorage.getItem('user_id'))}/follow`, {following_id: id})
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
            {
                (id !== localStorage.getItem('user_id') && id !== undefined) &&
                <div className='connectButton'>
                    {
                        (followers.filter(f => f.user_id === parseInt(localStorage.getItem('user_id'))).length > 0) ?
                        <button className='unfollow' onClick={handleUnfollow}>unfollow</button> :
                        <button className='follow' onClick={handleFollow}>follow</button>
                    }
                </div>
            }
            </div>
        </StyledFollowers>
    )
}

export default Followers