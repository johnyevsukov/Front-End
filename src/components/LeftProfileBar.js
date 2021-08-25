import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import axiosWithAuth from '../Utils/axiosWithAuth'
import EditProfile from './EditProfile'
import { importAll, avatarSelector } from '../Utils/avatarSelector'


const StyledLeftProfileBar = styled.div`
display: flex;
flex-direction: column;
height: 100%;
width: 22%;
background-color: #6ba6ed;
overflow: scroll;
border-right: 2px solid #1f7ced;

.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.username-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.username {
    text-align: center;
    font-weight: bold;
    font-size: 2.5rem;
    padding: .6rem;
    text-decoration: underline dotted;
}

.avatar-wrapper {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    padding: 1.5rem;
}

.user-info {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid white;
    padding: .5rem;
    margin: .5rem;
    border-radius: 5px;
    text-align: center;
    padding-bottom: 1.5rem;
}

.header-about {
    font-weight: bold;
    font-size: 1.3rem;
    padding: .5rem;
}

.info-piece {
    padding: .5rem;
    font-size: 1.1rem;
    border-bottom: 2px solid white;
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.buttons .edit {
    font-size: .9rem;
    cursor: pointer;
    border: 1px solid black;
    margin: .4rem;
    border-radius: 5px;
    padding: .4rem;
    width: 7rem;
}

.buttons .delete {
    font-size: .9rem;
    cursor: pointer;
    border: 1px solid black;
    margin: .4rem;
    border-radius: 5px;
    padding: .4rem;
    width: 7rem;
}

.delete-option h3 {
    padding: .4rem;
    font-weight: bold;
    background: linear-gradient(to right,
        #FFF 20%, #1b2059 40%,
        #1b2059 60%, #FFF 80%);
    background-size: 200% auto;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s linear infinite;
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
}

.delete-buttons {
    padding: .4rem;
    display: flex;
    justify-content: space-evenly;
}

.delete-buttons button {
    font-weight: bold;
    border-radius: 5px;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid black;
}

button {
    cursor: pointer;
    background: white;
}

/* desktop only */
@media (min-width: 950px) {
    .delete {
        transition: 200ms ease-in-out;
        &: hover {
            background-color: #FFC0CB;
            border-color: red;
            box-shadow:
            0 0 10px 5px #fff,  /* inner white */
            0 0 16px 10px pink, /* middle pink */
            0 0 23px 15px red; /* outer red */
        }
    }

    .edit {
        transition: 100ms ease-in-out;
        &: hover {
            background-color: #FFFF99;
            border-color: #FFD700;
        }
    }

    .no {
        transition: 100ms ease-in-out;
        &:hover {
            background: lightgreen;
            border-color: green;
        }
    }

    .yes {
        transition: 100ms ease-in-out;
        &:hover {
            background: pink;
            border-color: red;
            transform: rotate(-7deg);
        }
    }

    img {
        transition: .5s ease-in-out;
        &:hover {
            transform: rotate(20deg);
        }
    }
}

/* small laptops */
@media (max-width: 1200px) {
    .username {
        font-size: 2rem;
    }

    .avatar-wrapper {
        padding: .8rem;
    }

    img {
        height: 5rem;
        width: 5rem;
    }

    .user-info {
        padding: .2rem;
        padding-bottom: 1.5rem;
    }

    .header-about {
        font-weight: bold;
        font-size: 1rem;
        padding: .5rem;
    }

    .info-piece {
        padding: .3rem;
        font-size: 1rem;
    }
}

/* large-tablet */
@media (max-width: 960px) {
    width: 100%;
    height: 20%;
}

/* mobile */
@media (max-width: 710px) {
    border-right: none;
    .avatar-wrapper {
        padding: .1rem;;
    }

    .wrapper {
        width: 100%;
    }

    .username-avatar {
        flex-direction: row;
        padding: 1rem;
    }
}
`

const LeftProfileBar = (props) => {
    const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/))
    const { id } = useParams()
    const [user, setUser] = useState({})
    // const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
    const userId = localStorage.getItem('user_id')
    const { push } = useHistory()

    useEffect(() => {
        // setLoading(true)
        axiosWithAuth()
        .get(`users/${id}`)
        .then(res => {
            // setLoading(false)
            res.data.user_birthday ?
            setUser({
                ...res.data,
                user_birthday: res.data.user_birthday.slice(0, 10)
            }) :
            setUser(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    const handleDelete = () => {
        axiosWithAuth()
        .delete(`users/${id}`)
        .then(() => {
            push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const toggleEdit = () => {
        setEdit(!edit)
        setDeleteUser(false)
    }

    const toggleDelete = () => {
        setDeleteUser(!deleteUser)
    }

    return (
        <StyledLeftProfileBar>
            <div className='wrapper'>
                <div className='username-avatar'>
                    <h2 className='username'>{user.username}</h2>
                    <div className='avatar-wrapper'>
                        <img src={images[avatarSelector(user.user_avatar)].default} alt='avatar'/>
                    </div>
                </div>
                {   
                    edit ?
                    <EditProfile user={user} setUser={setUser} toggleEdit={toggleEdit}/> :
                    <div className='about'>
                        <div className='user-info'>
                            <h3 className='header-about'>About me:</h3>
                            <div>
                                <div className='info-piece'>Hi! I'm a {user.user_species || '...'}</div>
                                <div className='info-piece'>I'm located in<br/>{user.user_location || '...'}</div>
                                <div className='info-piece'>My birthday is<br/>{user.user_birthday || '...'}</div>
                                <div className='info-piece'>contact me at:<br/>{user.user_email}</div>
                            </div>
                        </div>
                        {
                            userId === id &&
                            <div className='buttons'>
                                <button className='edit' onClick={toggleEdit}>edit profile</button>
                                {
                                    deleteUser ?
                                    <div className='delete-option'>
                                        <h3>Are you sure?</h3>
                                        <div className='delete-buttons'>
                                            <button className='yes' onClick={handleDelete}>Yes</button>
                                            <button className='no' onClick={toggleDelete}>no</button>
                                        </div>
                                    </div> :
                                    <button className='delete'onClick={toggleDelete}>delete account</button>
                                }
                            </div>
                        }
                    </div>
                }
            </div>
        </StyledLeftProfileBar>
    )
}

export default LeftProfileBar
