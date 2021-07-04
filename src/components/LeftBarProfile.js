import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axiosWithAuth from '../Utils/axiosWithAuth'
import default_user from '../assets/default_user.png'
import EditProfile from './EditProfile'
import { useHistory } from 'react-router'


const StyledLeftBar = styled.div`
display: flex;
flex-direction: column;
align-items: center;
height: 95vh;
width: 20%;
background-color: #6ba6ed;

img {
    width: 70px;
    height: 70px;
    border: 2px solid white;
    border-radius: 20%;
}

.header {
    width: 100%;
    margin-bottom: 5%;
}

.buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    width: 50%;
    
    button {
        border-radius: 8px;
        border: 1px solid white;
    }
}

.deleteButtons {
    display: flex;
    flex-direction: column;
    justify-content: center;

    button {
        margin-bottom: 4%;
        &:hover {
            background-color: lightgray;
        }
    }
}

.delete {
    margin-top: 4%;
    margin-bottom: 4%;
    transition: transform .5s;
        &:hover {
            transform: scale(1.2);
            background-color: white;
            border: 1px solid gray;
            background-color: red;
            color: white;
            font-weight: bold;
            box-shadow: 20px 5px 40px red,
            0px 5px 40px red,
           -20px 5px 40px red;
        }
}

.edit {
    &:hover {
        background-color: #fff78c;
    }
}

.info {
    text-align: center;
    p {
        margin: 0;
        margin-bottom: 5%;
    }
}

@media (max-width: 680px) {
    width: 100%;
    height: 20vh;
    overflow: scroll;

    h2 {
        margin-top: .5%;
        margin-bottom: .5%;
    }

    h3 {
        margin-top: 0;
    }
`

const LeftBarProfile = (props) => {
    const { id } = useParams()
    const [user, setUser] = useState({})
    // const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [deleteUser, setDeleteUser] = useState(false)
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
        <StyledLeftBar>
            <div className='header'>
                <h2>{user.username}</h2>
                <img src={default_user} alt='a'/>
                {   !edit ?
                    <div>
                    <h3>About me:</h3>
                    <div className='info'>
                        <p>Hi! I'm a {user.user_species || '..?'}</p>
                        <p>I'm located in {user.user_location || '..?'}</p>
                        <p>My birthday is {user.user_birthday || '..?'}</p>
                        <p>contact me at: {user.user_email}</p>
                    </div>
                    {
                        localStorage.getItem('user_id') === id &&
                        <div className='buttons'>
                            <button className='edit' onClick={toggleEdit}>edit profile</button>
                            {
                                deleteUser ?
                                <div>
                                    <h2>Are you sure?</h2>
                                    <div className='deleteButtons'>
                                        <button onClick={handleDelete}>Yes</button>
                                        <button onClick={toggleDelete}>no</button>
                                    </div>
                                </div> :
                                <button className='delete'onClick={toggleDelete}>DELETE ACCOUNT</button>
                            }
                        </div>
                    }
                    </div> :
                    <EditProfile user={user} setUser={setUser} toggleEdit={toggleEdit}/>
                }
            </div>
        </StyledLeftBar>
    )
}

export default LeftBarProfile