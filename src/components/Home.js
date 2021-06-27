import React from 'react'
import styled from 'styled-components'

const StyledHome = styled.div`
margin: 0;
padding: 0;
height: 100vh;
background-color: lightblue;
display: flex;
background: linear-gradient(-45deg, #48d9ca, #006aff, #23a6d5, #23d5ab);
background-size: 400% 400%;
animation: gradient 15s ease infinite;

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

#info {
    border: 2px solid gray;
    width: 65%;
    justify-content: center;
    display: flex;
    flex-direction: column;

    h1 {
        font-size: xxx-large;
    }
}

#buttons {
    display: flex;
    flex-direction: column;
    border: 2px solid gray;
    width: 35%;
    justify-content: center;
    align-items: center;

    button {
        margin-top: 2%;
        margin-bottom: 2%;
        width: 40%;
        height: 4vh;
        border-radius: 10px;
        font-size: large;
        background-color: #fafdff;

        &:hover {
            background-color: lightblue;
            color: white;
            transform: scale(1.1);
            transition: all .2s ease-in-out;
        }

        transition: all .2s ease-in-out;
    }
}
`


const Home = () => {
    return (
        <StyledHome>
            <div id='info'>
                <h1>🐹🦎 Pet Post 🐱🐶</h1>
                <h3>Login or sign up to connect with all your best buds!</h3>
            </div>
            <div id='buttons'>
                <button>Login</button>
                <button>Signup</button>
            </div>
        </StyledHome>
    )
}

export default Home