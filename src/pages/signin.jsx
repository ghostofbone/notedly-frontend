import React from 'react';
import {gql, useApolloClient, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {isLoggedInVar} from "../apollo-client";
import UserForm from "../components/UserForm";

const  SIGNIN_USER = gql`
    mutation signIn($email: String!, $password: String!) {
        signIn(email: $email, password: $password) 
    }
`

const Signin = (props) => {
    const client = useApolloClient();
    const navigate = useNavigate();
    const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
        onCompleted: (data) => {
            localStorage.setItem('token', data.signIn);
            isLoggedInVar(true); // Update reactive variable
            console.log('User signed up successfully:');
            navigate('/')
        }
    })


    return (
        <React.Fragment>
            <UserForm action={signIn} formType='signin' errors={error} loading={loading} />
        </React.Fragment>
    );
};

export default Signin;