import React from 'react'
import styled from 'styled-components'
import default_user from '../assets/default_user.png'


const StyledUserCard = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 50%;
width: 50%;

&:hover {
    color: white;
}

img {
    width: 25px;
    height: 25px;
}
`

const UserCard = (props) => {
    const { user } = props
    return (
        <StyledUserCard>
            <img src={default_user} alt={default_user}></img>
            <p>{user.username}</p>
        </StyledUserCard>
    )
}

export default UserCard