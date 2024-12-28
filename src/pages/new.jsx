import React, {useEffect} from 'react';
import NoteForm from "../components/NoteForm";
import {gql, useMutation} from "@apollo/client";
import {useNavigate} from "react-router-dom";
import {GET_MY_NOTES, GET_NOTES} from "../qql/query";

const NEW_NOTE = gql`
    mutation NewNote($content: String!) {
        newNote(content: $content) {
            id
            content
            createdAt
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`

const NewNote = () => {
    useEffect(() => {
        document.title = "New Note";
    }, []);
    const navigate = useNavigate();

    const [data, {loading, error}] = useMutation(NEW_NOTE, {
        refetchQueries: [{query: GET_NOTES}, {query: GET_MY_NOTES}],
        onCompleted: (data) => {
            console.log('New note created successfully:', data.newNote.id);
            navigate(`/notes/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;