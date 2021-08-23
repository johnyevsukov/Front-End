import React from 'react'
import styled from 'styled-components'
import cat from '../assets/cat.png'
import { useHistory } from 'react-router-dom'
import { importAll, avatarSelector } from '../Utils/avatarSelector'


const StyledUserCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 6.1rem;
height: 6.1rem;
margin-top: .3rem;
margin-bottom: .3rem;
background-color: rgba(255, 255, 255, 0.2);
border: 2px solid white;
border-radius: 50%;
position: relative;
cursor: pointer;

.hover-info {
    visibility: hidden;
    width: 4rem;
    height: 4rem;
    background-color: #408eed;
    color: black;
    text-align: center;
    border-radius: 5px;
    padding: 5px 0;
    position: fixed;
    z-index: auto;
    top: 40%;
    right: 10%;
}

.username {
    padding-top: .1rem;
    font-weight: bold;
}

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img {
    width: 30px;
    height: 30px;
}

/* large-desktop */
@media (min-width: 1850px) {
    width: 7rem;
    height: 7rem;

    img {
        width: 40px;
        height: 40px;
    }
}

/* desktop only */
@media (min-width: 950px) {
    transition: 200ms ease-in-out;
    &:hover {
        color: white;
        background-color: rgba(255, 255, 255, 0.5);
        // .hover-info {
        //     transition: .3s ease-in-out;
        //     visibility: visible;
        // }
        img {
            transition: .3s ease-in-out;
            transform: rotate(20deg);
        }
    }
}

/* laptops */
@media (max-width: 1480px) {
    width: 5rem;
    height: 5rem;
    
    .wrapper {
        padding: .4rem;
    }
}

/* small-laptops */
@media (max-width: 1060px) {
    width: 4rem;
    height: 4rem;

    .username {
        font-size: .8rem;
    }

    img {
        width: 25px;
        height: 25px;
    }
}

/* large-tablet */
@media (max-width: 960px) {
}

/* mobile */
@media (max-width: 710px) {
    
}
`

const UserCard = (props) => {
    const { user } = props
    const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/))
    const { push } = useHistory()

    const handleClick = () => {
        push(`/profile/${user.user_id}`)
    }

    const trimName = (name) => {
        if (name.length > 6) {
            return name.slice(0, 4) + '..'
        }
        else {
            return name
        }
    }

    return (
        <StyledUserCard onClick={handleClick}>
            <div className='wrapper'>
                <img src={images[avatarSelector(user.user_avatar)].default} alt={cat}/>
                <div className='username'>{trimName(user.username)}</div>
                <div className='hover-info'>{user.username} <br/> {user.user_species} <br/> {user.user_location}</div>
            </div>
        </StyledUserCard>
    )
}

export default UserCard
