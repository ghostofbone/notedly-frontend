import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { useMutation, useQuery} from "@apollo/client";
import {GET_ME, GET_NOTE} from "../qql/query";
import NoteForm from "../components/NoteForm";
import {EDIT_NOTE} from "../qql/mutation";

const EditNotes = (props) => {
    const navigate = useNavigate();

    const {id} = useParams();
    // Fetch the note details
    const { loading: noteLoading, error: noteError, data: noteData } = useQuery(GET_NOTE, { variables: { id } });

    // Fetch the logged-in user's information
    const { loading: userLoading, error: userError, data: userdata } = useQuery(GET_ME);
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            navigate(`/notes/${id}`)
        }
    })

    // Handle loading and error states for GET_NOTE
    if (noteLoading || userLoading) {
        return <p>Loading...</p>;
    }
    if (noteError) return <p>Error: {noteError.message}</p>;
    if (userError) return <p>Error: {userError.message}</p>;

    if(userdata.me.id !== noteData.note.author.id) return (
        <p>You are not authorized to edit this note</p>
    )
    // Authorization check: Ensure the current user is the author of the note
    if (!userdata || !noteData || userdata.me.id !== noteData.note.author.id) {
        return <p>You are not authorized to edit this note</p>;
    }

    return (
       <NoteForm content={noteData.note.content} action={editNote}/>
    );
};

export default EditNotes;