import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import github from '../assets/github.png';

const StyledHome = styled.div`
height: 100vh;
background: 
linear-gradient(
    -45deg, #CFE3FF,
    #5099FF, #006aff, 
    #2E85FF);

.wrapper {
    height: 100vh;
    display: flex;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 65%;
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 35%;
}

button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: inherit;
    border-radius: 10px;
    border: 2px outset gray;
    cursor: pointer;
    padding: .7rem;
    margin: .5rem;
    width: 50%;
    font-size: 1.4rem;
}

h1 {
    font-size: 5.5rem;
    font-weight: bold;
    padding: 30px;
}

h3 {
    font-size: 1.7rem;
}

img {
    position: absolute;
    bottom: 17px;
    right: 17px;
    height: 5rem;
    width: 5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: .5s ease-in-out;
}

/* desktop only */
@media (min-width: 950px) {
    button {
        transition: 200ms ease-in-out;
        &: hover {
            transform: scale(1.1);
            background-color: lightgreen;
            border: none;
            font-weight: bold;
            color: white;
            box-shadow:
            0 0 5px 2.5px #fff,  /* inner white */
            0 0 8px 5px lightgreen,
            0 0 11px 7px lightgreen;
        }
    }

    img {
        &:hover {
            transform: rotate(360deg);
            background: lightgreen;
            color: white;
            box-shadow:
            0 0 15px 7px #fff,  /* inner white */
            0 0 25px 15px lightgreen,
            0 0 35px 22px lightgreen;
        }
    }
}

/* small laptops */
@media (max-width: 1200px) {
    h1 {
        font-size: 5rem;
        width: 7ch;
    }

    h3 {
        font-size: 1.5rem;
        width: 20ch;
        text-align: center;
        padding-right: 40px;
    }

    img {
        bottom: 12px;
        right: 12px;
        height: 4rem;
        width: 4rem;
    }
}

/* mobile */
@media (max-width: 710px) {
    h1 {
        font-size: 3.1rem;
        padding-bottom: 1rem;
        padding-left: 55px;
    }

    h3 {
        font-size: 1.3rem;
        padding: 0;
        width: 15ch;
        font-weight: bold;
    }

    .info {
        width: 95%;
    }

    .buttons {
        margin-top: 1rem;
        width: 90%;
    }

    .wrapper {
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login {
        width: 80%;
        background-color: lightgreen;
    }

    .signup {
        background-color: white;
    }

    img {
        height: 3rem;
        width: 3rem;
    }

    button {
        border: none;
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
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
            <div className='wrapper'>
                <div className='info'>
                    <h1>???????? Pet Post ????????</h1>
                    <h3>Login or sign up to connect with all your best buds!</h3>
                </div>
                <div className='buttons'>
                    <button className='login' onClick={login}>Login ???????</button>
                    <button className='signup' onClick={signup}>Signup ????</button>
                </div>
                <a href='https://github.com/johnyevsukov/Front-End' target="_blank" rel="noopener noreferrer">
                    <img src={github} alt='github'/>
                </a>
            </div>
        </StyledHome>
    )
}

export default Home
