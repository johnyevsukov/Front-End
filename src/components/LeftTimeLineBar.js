import React from 'react'
import styled from 'styled-components'

const StyledLeftTimeLineBar = styled.div`
height: height: 100%;
width: 22%;
background-color: #6ba6ed;
border-right: 2px solid #1f7ced;

/* mobile */
@media (max-width: 710px) {
    border-right: none;
}

/* large-tablet */
@media (max-width: 960px) {
    width: 100%;
    height: 20%;
}
`

const LeftTimeLineBar = () => {
    return (
        <StyledLeftTimeLineBar>
        </StyledLeftTimeLineBar>
    )
}

export default LeftTimeLineBar
