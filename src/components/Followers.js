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
max-width: 20rem;

h3 {
    text-align: center;
    font-weight: bold;
    padding: 1.5rem;
    background:
    linear-gradient(
        90deg, 
        #6ba6ed,
        #ffffff)
}

.follow-unfollow {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #3080ff;
    padding: .4rem;
}

.follow-unfollow button {
    background: white;
    border-radius: 10px;
    font-size: 1rem;
    padding: .4rem;
    width: 8rem;
}

.followers {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-height: 13.8rem;
    overflow: scroll;
}

/* desktop only */
@media (min-width: 950px) {
    .follow {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: lightgreen;
            border-color: green;
            font-weight: bold;
        }
    }

    .unfollow {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: #FFC0CB;
            border-color: red;
            font-weight: bold;
        }
    }
}

/* large-desktop */
@media (min-width: 1850px) {
    .followers {
        max-height: 15.9rem;
    }
}

/* laptops */
@media (max-width: 1480px) {
    .followers {
        max-height: 11.8rem;
    }
    h3 {
        padding: .5rem;
    }
}

/* small-laptops */
@media (max-width: 1060px) {
    .followers {
        max-height: 9.6rem;
    }
}

/* tablet */
@media (max-width: 960px) {
    width: 40%;
}

/* mobile */
@media (max-width: 710px) {
    margin: none;
    .followers {
        max-height: 5rem;
    }
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
            <h3>({followers.length}) Followers</h3>
            <div className='followers'>
            {loading && <div className='loader'></div>}
            {
                followers.map(user => {
                    return <UserCard key={user.user_id} user={user} />
                })
            }
            </div>
            {
                (id !== userId && id !== undefined) &&
                <div className='follow-unfollow'>
                    {
                        (followers.filter(fol => 
                            fol.user_id === parseInt(userId)).length > 0) ?
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
