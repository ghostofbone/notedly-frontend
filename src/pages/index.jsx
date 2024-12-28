import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Home from "./home";
import Mynotes from "./mynotes";
import Favorites from "./favorites";
import Layout from "../components/Layouts";
import Notes from "./notes";
import Signup from "./signup";
import Signin from "./signin";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import client from "../apollo-client";
import NewNote from "./new";
import EditNotes from "./editNotes"; // Import the pre-configured Apollo client

const IS_LOGGED_IN = gql`
    query IsLoggedIn {
        isLoggedIn @client
    }
`;

// ProtectedRoute Component
const ProtectedRoute = () => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    const location = useLocation(); // Get current location for redirection

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // Check login status and redirect to `/signin` if not logged in
    if (!data?.isLoggedIn) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    // Otherwise, render child routes wrapped by this wrapper
    return <Outlet />;
};

// Main Pages Component
const Pages = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/notes/:id" element={<Notes />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/mynotes" element={<Mynotes />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/new" element={<NewNote />} />
                            <Route path="/edit/:id" element={<EditNotes />} />
                        </Route>
                    </Routes>
                </Layout>
            </Router>
        </ApolloProvider>
    );
};

export default Pages;