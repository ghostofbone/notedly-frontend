import React from "react";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client"; // Import useReactiveVar
import { Link, useNavigate } from "react-router-dom";
import ButtonLink from "./Button-Link";
import { isLoggedInVar } from "../apollo-client";

const HeaderBar = styled.header`
    width: 100%;
    padding: 0.5em 1em;
    display: flex;
    height: 64px;
    position: fixed;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`;

const LogoText = styled.h1`
    margin: 0;
    padding: 0;
    display: inline;
`;

const UserState = styled.div`
    margin-left: auto;
    a {
        padding: 0 1em;
        :hover {
            text-decoration: underline;
        }
    }
`;

const Header = (props) => {
    const navigate = useNavigate();
    const isLoggedIn = useReactiveVar(isLoggedInVar); // Subscribe to the reactive variable

    const logout = () => {
        localStorage.removeItem("token");
        isLoggedInVar(false); // Toggle the reactive variable to logged-out state
        navigate("/signin");
    };

    return (
        <HeaderBar>
            <span
                style={{
                    display: "block",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                }}
            />
            <LogoText>{props.title ? props.title : "Notedly"}</LogoText>
            <UserState>
                {isLoggedIn ? (
                    <ButtonLink onClick={logout}>Logout</ButtonLink>
                ) : (
                    <p>
                        (<Link to="/signin">Login</Link>/<Link to="/signup">Signup</Link>)
                    </p>
                )}
            </UserState>
        </HeaderBar>
    );
};

export default Header;