import React, {useEffect} from 'react';
import {useQuery} from "@apollo/client";
import {GET_MY_FAVORITES} from "../qql/query";
import NoteFeed from "../components/NoteFeed";

const Favorites = (props) => {
    useEffect(() => {
        document.title = "Favorites - Notedly";
    }, []);

    const { data, loading, error } = useQuery(GET_MY_FAVORITES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (data?.me?.favorites?.length !== 0) return <NoteFeed notes={data.me.favorites} />;
    else return <p>No favorites yet</p>;
}

export default Favorites;