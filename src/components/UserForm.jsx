import styled from "styled-components";


import React, {useState} from 'react';
import Button from "./Button";

const UserForm = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Filter formData based on the form type
        const variables =
            props.formType === 'signup'
                ? { ...formData } // Include all fields for signup
                : { email: formData.email, password: formData.password }; // Only email and password for signin

        console.log('Submitted variables:', variables); // Debug filtered variables

        props.action({ variables });
    };


    return (
        <Wrapper>
        <Form onSubmit={handleSubmit}>
            {props.formType === 'signup' && (
            <React.Fragment>
            <label htmlFor="username">Username:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                />
            </React.Fragment>
            )}
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
            />

            <label htmlFor="password">Password:</label>
            <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
            />

            <Button type="submit" disabled={props.loading}>
                {props.loading ? 'Submit...' : 'Submit'}
            </Button>
            {props.error && <p style={{ color: 'red' }}>Error: {props.error.message}</p>}
        </Form>
     </Wrapper>
    );
};

export default UserForm;






const Wrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 1em;
  border: 1px solid #f5f4f0;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
      border-color: blue;
      outline: none;
    }
  }
`;
