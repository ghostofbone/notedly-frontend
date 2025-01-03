import React from 'react';
import ButtonLink from "./Button-Link";
import {useMutation} from "@apollo/client";
import {DELETE_NOTE} from "../qql/mutation";
import {GET_MY_NOTES, GET_NOTES} from "../qql/query";
import {useNavigate} from "react-router-dom";

const DeleteNote = (props) => {
    const navigate = useNavigate();
    const [deleteNote] = useMutation(DELETE_NOTE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{query: GET_MY_NOTES, GET_NOTES}],
        onCompleted: data => {
            navigate('/mynotes');
        }
    })


    return (
        <ButtonLink onClick={deleteNote}>Delete Note</ButtonLink>
    );
};

export default DeleteNote;