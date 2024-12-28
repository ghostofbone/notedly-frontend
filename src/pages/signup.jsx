import React from 'react'; // Removed useState
import { gql, useMutation } from '@apollo/client'; // Removed useApolloClient
import { useNavigate } from 'react-router-dom';
import { isLoggedInVar } from '../apollo-client'; // Import the reactive variable
import UserForm from "../components/UserForm";

// Mutation for signing up a new user
const SIGNUP_USER = gql`
    mutation SignUp($username: String!, $password: String!, $email: String!) {
        signUp(username: $username, password: $password, email: $email)
    }
`;

const Signup = () => {
    const navigate = useNavigate();
    // Removed client declaration because it was unused.

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