import { ApolloClient, InMemoryCache, createHttpLink, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Reactive variable to manage `isLoggedIn` state
export const isLoggedInVar = makeVar(!!localStorage.getItem('token')); // True if token exists, false otherwise

// HTTP Link to your GraphQL API
const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API_URI
});

// Context for adding headers like "Authorization"
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    return {
        headers: {
            ...headers,
            authorization: token ? `${token}` : "", // Include token if available
        },
    };
});

// Initialize cache
const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    }
                }
            }
        }
    }
});

// Apollo Client setup
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: true,
    resolvers: {},
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

// Set up `onResetStore`
client.onResetStore(() => {
    console.log("Resetting store, updating local state...");
    isLoggedInVar(false); // Properly resets the reactive variable
});

export default client;