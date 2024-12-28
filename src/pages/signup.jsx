import React, { useState } from 'react';
import styled from 'styled-components';
import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { isLoggedInVar } from '../apollo-client'; // Import the reactive variable
import Button from '../components/Button';
import UserForm from "../components/UserForm";

// Mutation for signing up a new user
const SIGNUP_USER = gql`
    mutation SignUp($username: String!, $password: String!, $email: String!) {
        signUp(username: $username, password: $password, email: $email)
    }
`;

const Signup = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const client = useApolloClient();

    // Mutation setup
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: (data) => {
            const token = data.signUp;
            localStorage.setItem('token', token); // Save token
            isLoggedInVar(true); // Update reactive variable
            console.log('User signed up successfully:', token);
            navigate('/');
        }
    });



    return (

        <React.Fragment>
            <h1>Sign Up</h1>
            <UserForm action={signUp} formType='signup' errors={error} loading={loading} />
        </React.Fragment>
    );
};




export default Signup;