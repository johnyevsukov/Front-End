import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import axiosWithAuth from '../Utils/axiosWithAuth'
import ExitToApp from '@material-ui/icons/ExitToApp'
import MenuBook from '@material-ui/icons/MenuBook'
import Pets from '@material-ui/icons/Pets'
import Search from '@material-ui/icons/Search'


const StyledNavBar = styled.div`
display: flex;
justify-content: space-evenly;
align-items: center;
height: 63px;
background-color: #408eed;
border-bottom: 2px solid #1f7ced;

.formDiv {
    width: 40%;
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
        width: 100%;
        height: 100%;
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
            background-color: white;
            border-radius: 8px;
            height: 75%;
        }
    }
}

.formDiv .results {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 20%;
    border: 2px solid #408eed;
    background-color: white;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: 63px;
}

.result {
    width: 100%;
    margin: 0;
    padding-top: 2%;
    padding-bottom: 2%;
    &:hover {
        background-color: #6ba6ed;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
}

.buttons {
    width: 20%;
    height: 60%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    span {
        border: 1px solid gray;
        padding-top: .5%;
        padding-bottom: .5%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border-radius: 17px;
        width: 80px;
        height: 74%;
        transition: .1s ease-in-out;
        &:hover {
            background-color: #f2f2f2;
            cursor: pointer;
            box-shadow: 0px 3px 8px #000;
        }
    }
    .logout {
        &:hover {
            background-color: pink;
            cursor: pointer;
            box-shadow: 0px 3px 8px #000;
        }
    }
}

h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 60%;
    font-size: xx-large;
    background: linear-gradient(270deg, white, #408eed);
    border-radius: 20px;
    &:hover {
        cursor: pointer;
    }
}

.outer .profile {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    right: 105%;
}

.outer:hover .profile {
    visibility: visible;
  }

.outer .feed {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    right: 105%;
}

.outer:hover .feed {
    visibility: visible;
}

.outer .logoutText {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;
    position: absolute;
    z-index: 1;
    top: -5px;
    right: 105%;
}

.outer:hover .logoutText {
    visibility: visible;
}

@media (max-width: 680px) {
    justify-content: space-evenly;
    h3 {
        font-size: small;
        width: 20%;
    }
    .buttons {
        width: 30%;
        span {
            width: 30%;
        }
    }
    .formDiv {
        form {
            input {
                width: 100%;
            }
            button {
                width: 30%;
            }
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

    // debounce
    const debounce = (fn, delay, e) => {
        let timeoutId
        return function(e) {
            const { name, value } = e.target
            setFormValues({
                ...formValues,
                [name]: value
            })
            if(timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(()=>fn(value), delay)
            console.log(timeoutId)
        }
    }

    const handleChange = (value) => {
        axiosWithAuth()
        .post('users/search', {username: value})
        .then(res => {
            if (value.length < 1) {
                setSearchResults([])
            }
            else {
                setSearchResults(res.data)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const search = useCallback(debounce(handleChange, 300), [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
        .post('')
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

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

    const goToUser = (id) => {
        push(`/profile/${id}`)
        setFormValues(initialFormValues)
        setSearchResults([])
    }

    return (
        <StyledNavBar>
            <h3 onClick={goToFeed}>Petpost 🐹</h3>
            <div className='formDiv'>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <input
                    type='text'
                    list='results'
                    name='username'
                    placeholder='Search for a bud..'
                    onChange={search}
                    value={formValues.username}
                    />
                    <button>
                        <Search />
                    </button>
                </form>
                {searchResults.length > 0 &&
                <div className='results'>
                {searchResults.map(result => {
                    return <div onClick={() => goToUser(result.user_id)} className='result'>{result.username}</div>
                })}
                </div>}
            </div>
            <div className='buttons'>
                <span className='outer' onClick={goToProfile}>
                    <Pets />
                    <div className='profile'>
                        Profile
                    </div>
                </span>
                <span className='outer' onClick={goToFeed}>
                    <MenuBook />
                    <div className='feed'>
                        Feed
                    </div>
                </span>
                <span className='logout outer' onClick={logout}>
                    <ExitToApp />
                    <div className='logoutText'>
                        Logout
                    </div>
                </span>
            </div>
        </StyledNavBar>
    )
}

export default NavBar
