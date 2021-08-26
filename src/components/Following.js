import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import UserCard from './UserCard'

const StyledFollowing = styled.div`
display: flex;
flex-direction: column;
border: 2px solid white;
border-radius: 5px;
width: 90%;
max-width: 20rem;
margin-bottom: 1rem;

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

.followers {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    max-height: 13.8rem;
    overflow: scroll;
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
    margin-bottom: 0;
    .followers {
        max-height: 5rem;
    }
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
            <h3>({following.length}) Following</h3>
            <div className='followers'>
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
