import React from 'react';
import { useParams } from "react-router-dom";
import {  useQuery } from "@apollo/client";
import Note from "../components/Note";
import { GET_NOTE } from "../qql/query";

const Notes = () => { // Removed props
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return <Note note={data.note} />;
};

export default Notes;