import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

const StyledHome = styled.div`
margin: 0;
padding: 0;
height: 100vh;
background-color: lightblue;
display: flex;
background: linear-gradient(-45deg, #CFE3FF, #5099FF, #006aff, #2E85FF);

.info {
    width: 65%;
    justify-content: center;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: 80px;
        margin: 0;
    }

    h3 {
        font-size: 30px;
    }
}

#buttons {
    display: flex;
    flex-direction: column;
    width: 35%;
    justify-content: center;
    align-items: center;

    button {
        margin-top: 2%;
        margin-bottom: 2%;
        width: 40%;
        height: 5vh;
        border-radius: 10px;
        font-size: 25px;
        background-color: #fafdff;

        &:active {
            background-color: #ededed;
        }
    }
}

@media (max-width: 1600px) {
    .info {
        h1 {
            font-size: 60px;
            margin: 0;
        }
    
        h3 {
            font-size: 20px;
        }
    }
}

@media (max-width: 1224px) {
    #buttons {
        button {
            height: 8vh;
        }
    }
    .info {
        h1 {
            font-size: 60px;
            margin: 0;
        }
    
        h3 {
            font-size: 20px;
        }
    }
}

@media (min-width: 1224px) {
    #buttons {    
        button {   
            &:hover {
                background-color: #006aff;
                color: white;
                transform: scale(1.1);
                transition: all .2s ease-in-out;
            }
            transition: all .2s ease-in-out;
        }
    }
}

@media (max-width: 680px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .info {
        width: 90%;
        h1 {
            font-size: 30px;
            margin: 0;
            padding: 0;
        }
    
        h3 {
            display: none;
        }
    }

    #buttons {
        width: 100%;

        button {
            height: 8vh;
            font-size: 20px;
    }

    .login {
        width: 80%;
        margin-top: 10%;
    }

    .signup {
        background-color: lightgreen;
        &:active {
            background-color: #6eff5e;
        }
    }
}
`


const Home = () => {
    const { push } = useHistory()

    const login = () => {
        push('/login')
    }

    const signup = () => {
        push('/register')
    }

    return (
        <StyledHome>
            <div className='info'>
                <h1>🐹🦎 Pet Post 🐱🐶</h1>
                <h3>Login or sign up to connect with all your best buds!</h3>
            </div>
            <div id='buttons'>
                <button className='login' onClick={login}>Login 🕊️</button>
                <button className='signup' onClick={signup}>Signup 🐾</button>
            </div>
        </StyledHome>
    )
}

export default Home
