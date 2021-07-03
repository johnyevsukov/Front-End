import React from 'react'
import styled from 'styled-components'
// import { useState } from 'react'
import { useHistory } from 'react-router'


const StyledNavBar = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
height: 63px;
background-color: #408eed;
border-bottom: 2px solid #1f7ced;

form {
    width: 50%;
    border: 2px solid gray;
    height: 60%;
    align-items: center;
    display: flex;
    justify-content: center;

    input {
        width: 40%;
        outline: none;
        border-radius: 8px;
        border: none;
        height: 60%;
    }

    button {
        border-radius: 8px;
        height: 75%;
    }
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border: 2px solid gray;
    width: 20%;
    height: 60%;

    button {
        height: 80%;
        border-radius: 8px;
        transition: transform .2s;
        &:hover {
            transform: scale(1.2);
            background-color: white;
            border: 1px solid gray;
        }
    }

    .logout {
        &:hover {
            background-color: pink;
            border: 1px solid red;
        }
    }
}

h3 {
    width: 20%;
    height: 60%;
    font-size: xx-large;
    background: linear-gradient(270deg, white, #408eed);
    border-radius: 20px;
    &:hover {
        cursor: pointer;
    }
}
`

// const initialFormValue = ``

const NavBar = () => {
    // const [formValue, setFormValue] = useState(initialFormValue)
    const { push } = useHistory()

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        push('/')
    }

    const goToProfile = () => {
        push(`/profile/${localStorage.getItem('user_id')}`)
    }

    const goToFeed = () => {
        push('/timeline')
    }

    return (
        <StyledNavBar>
            <h3 onClick={goToFeed}>Petpost 🐹</h3>
            <form>
                <input
                type='text'
                placeholder='Search for a bud..'
                />
                <button>search</button>
            </form>
            <div className='buttons'>
                <button onClick={goToProfile}>Profile</button>
                <button onClick={goToFeed}>Feed</button>
                <button className='logout' onClick={logout}>Logout</button>
            </div>
        </StyledNavBar>
    )
}

export default NavBar