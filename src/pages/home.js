import React from 'react';
import {gql, useQuery} from "@apollo/client";
import ReactMarkdown from "react-markdown"
import Note from "../components/Note";
import NoteFeed from "../components/NoteFeed";
import Button from "../components/Button";
import {GET_NOTES} from "../qql/query";

const Home = (props) => {



    const{data, loading, error, fetchMore} = useQuery(GET_NOTES, {
        variables: { cursor: "" } // Default cursor for the first page
    })
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Data:", data);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && data.noteFeed ? (
                <div>
                    <NoteFeed notes={data.noteFeed.notes} />
                    {data.noteFeed.hasNextPage && (
                        <Button onClick={() => {
                            fetchMore({
                                variables: {
                                    cursor: data.noteFeed.cursor,
                                },
                                updateQuery: (previousQueryResult, {fetchMoreResult}) => {
                                    return {
                                        noteFeed: {
                                            cursor: fetchMoreResult.noteFeed.cursor,
                                            hasNextPage: previousQueryResult.noteFeed.hasNextPage,
                                            notes: [
                                                ...previousQueryResult.noteFeed.notes,
                                                ...fetchMoreResult.noteFeed.notes,
                                            ],
                                            __typename: 'noteFeed'
                                        }
                                    }
                                }
                            })
                        }}>Load more</Button>
                    )}
                </div>
            ) : (
                <p>No notes available.</p>
            )}
        </div>
    );

}

export default Home;