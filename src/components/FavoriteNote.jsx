import React, { useState } from 'react';
import ButtonLink from "./Button-Link";
import {useMutation} from "@apollo/client";
import {TOGGLE_FAVORITE} from "../qql/mutation";
import {GET_MY_FAVORITES} from "../qql/query";

const FavoriteNote = (props) => {
    // Initialize favorite count from props
    const [count, setCount] = useState(props.favoriteCount);

    // Safely check if the note is favorited by the user
    const [favorited, setFavorited] = useState(
        !!props.me.favorites.find(f => f.id === props.noteId) // Safely check if the note is favorited
    );

    const [togleFavorite] = useMutation(TOGGLE_FAVORITE, {
        variables: {
            id: props.noteId
        },
        refetchQueries: [{query: GET_MY_FAVORITES}],
    })

    // Handle adding to favorites
    const handleAddFavorite = () => {
        togleFavorite();
        setFavorited(true); // Update "favorited" state
        setCount(count + 1); // Increment the favorite count locally

        // [Optional] Call server mutation here to add the note to favorites,
        // e.g., props.addFavoriteMutation({variables: {noteId: props.noteId}});
    };

    // Handle removing from favorites
    const handleRemoveFavorite = () => {
        togleFavorite();
        setFavorited(false); // Update "favorited" state
        setCount(count - 1); // Decrement the favorite count locally

        // [Optional] Call server mutation here to remove the note from favorites,
        // e.g., props.removeFavoriteMutation({variables: {noteId: props.noteId}});
    };

    // Render the favorite/unfavorite button and the count
    return (
        <React.Fragment>
            {favorited ? (
                <ButtonLink onClick={handleRemoveFavorite}>
                    Remove from favorites
                </ButtonLink>
            ) : (
                <ButtonLink onClick={handleAddFavorite}>
                    Add to favorites
                </ButtonLink>
            )}
            : {count}
        </React.Fragment>
    );
};

export default FavoriteNote;