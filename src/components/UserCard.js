import React from 'react'
import styled from 'styled-components'
import default_user from '../assets/default_user.png'
import { useHistory } from 'react-router-dom'


const StyledUserCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 49%;
width: 49%;

&:hover {
    color: white;
    border: 1px solid white;
    border-radius: 5px;
    cursor: pointer;
}

img {
    width: 25px;
    height: 25px;
}
`

const UserCard = (props) => {
    const { user } = props
    const { push } = useHistory()

    const handleClick = () => {
        push(`/profile/${user.user_id}`)
    }

    return (
        <StyledUserCard onClick={handleClick}>
            <img src={default_user} alt={default_user}></img>
            <p>{user.username}</p>
        </StyledUserCard>
    )
}

export default UserCard