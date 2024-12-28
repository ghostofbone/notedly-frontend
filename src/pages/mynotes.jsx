import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_NOTES } from "../qql/query";
import NoteFeed from "../components/NoteFeed";

const Mynotes = (props) => {
    useEffect(() => {
        document.title = "My Notes Notedly";
    });

    const { data, loading, error } = useQuery(GET_MY_NOTES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data?.me?.notes?.length !== 0) return <NoteFeed notes={data.me.notes} />;
    else return <p>No notes yet</p>;
};

export default Mynotes;