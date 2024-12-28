import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";



const Nav = styled.nav`
    padding: 1em;
    background: #f5f4f0;
    
    @media(max-width: 700px) {
        padding-top: 64px;
    }
    
    @media(min-width: 700px) {
        position: fixed;
        width: 220px;
        height: calc(100% - 64px);
        overflow-y: scroll;
    }
`;

const NavList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    line-height: 2;
    
    a{
        font-weight: bold;
        font-size: 1.5em;
        color: #333;
        transition: all linear 0.2s;
    }
    a:visited {
        color: #333
    }
    a:hover, a:focus{
        text-decoration: underline;
        color: #004499;
    }
`


const Navigation = (props) => {
    return (
        <Nav className="nav">
            <NavList className="nav__list">
                <li className="nav__list-item">
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to={'/mynotes'}>My Notes</Link>
                </li>
                <li>
                    <Link to={'/favorites'}>Favorites</Link>
                </li>
                <li>
                    <Link to={'/new'}>New Note</Link>
                </li>
            </NavList>
        </Nav>
    )
}
export default Navigation;