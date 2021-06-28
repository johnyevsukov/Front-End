import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useHistory } from 'react-router'


const StyledNavBar = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
height: 5vh;
background-color: #408eed;
border: 2px solid gray;

form {
    width: 60%;
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
    }
}

h3 {
    width: 20%;
    border: 2px solid gray;
    height: 60%;
    font-size: xx-large;
}
`

const initialFormValue = ``

const NavBar = () => {
    const [formValue, setFormValue] = useState(initialFormValue)
    const { push } = useHistory()

    const logout = () => {
        localStorage.removeItem('token')
        push('/')
    }

    return (
        <StyledNavBar>
            <h3>Petpost 🐹</h3>
            <form>
                <input
                type='text'
                placeholder='Search for a bud..'
                />
                <button>search</button>
            </form>
            <div className='buttons'>
                <button>Profile</button>
                <button onClick={logout}>Logout</button>
            </div>
        </StyledNavBar>
    )
}

export default NavBar