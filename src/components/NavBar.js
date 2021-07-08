import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { useHistory } from 'react-router'
import axiosWithAuth from '../Utils/axiosWithAuth'


const StyledNavBar = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
height: 63px;
background-color: #408eed;
border-bottom: 2px solid #1f7ced;

form {
    width: 50%;
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

.results {
    position: absolute;
    margin-top: 8%;
    border: 2px solid black;
    width: 27%;
    z-index: 999;

}

.buttons {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
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

@media (max-width: 680px) {
    justify-content: center;
    h3 {
        font-size: medium;
        border: 1px solid black;
        width: 17%;
    }
    .buttons {
        width: 45%;
        border: 1px solid black;
        button {
            width: 32%;
        }
    }
    form {
        border: 1px solid black;
        width: 30%;
        button {
            width: 45%;
        }
    }
}
`

const initialFormValues = {
    username: ''
}

const NavBar = () => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [searchResults, setSearchResults] = useState([])
    const { push } = useHistory()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({
            ...formValues,
            [name]: value
        })
        console.log(e.target.value)
        axiosWithAuth()
        .post('users/search', {username: e.target.value})
        .then(res => {
            console.log(res)
            setSearchResults(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    // const handleSubmit = () => {
    //     axiosWithAuth()
    //     .post('')
    //     .then(res => {
    //         console.log(res)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        push('/')
    }

    const goTo = (id) => {
        push(`profile/${id}`)
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
            <form autoComplete="off">
                <input
                type='text'
                list='results'
                name='username'
                placeholder='Search for a bud..'
                onChange={handleChange}
                value={formValues.username}
                />
                <datalist id='results'>
                    {
                        // no onClick for option tag :(
                        searchResults.map(user => {
                            return <option onClick={() => goTo(user.user_id)} value={user.username}></option>
                        })
                    }
                </datalist>
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
