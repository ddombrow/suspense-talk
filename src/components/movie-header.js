
import React from "react";

function formatYear(releaseDate) {
    return releaseDate.split("-")[0];
}

const MovieHeader = (props) => {
    const movieData = props.resource.read();
    return (
        <>
            <h1>{props.rank ? <span>{props.rank}.</span> : null } {movieData.title} ({formatYear(movieData.release_date)})</h1>
            <blockquote>"{movieData.tagline}"</blockquote>
        </>
    );
}

export default MovieHeader;