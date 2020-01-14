
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Spinner from "react-svg-spinner";
import { MovieDbContext } from "./moviedb";

function formatYear(releaseDate) {
    return releaseDate.split("-")[0];
}

const MovieHeader = (props) => {
    const movieId = props.id;
    const [movieData, setMovieData] = useState(null);
    const movieDbCtx = useContext(MovieDbContext);

    useEffect(() => {
        axios.get(`${movieDbCtx.apiBaseUrl}/movie/${movieId}`, {
            headers: {
                authorization: `Bearer ${movieDbCtx.apiBearer}`
            }
        }).then(({data: movie }) => {
            setMovieData(movie);
        });
    }, [movieId]);

    if (!movieData || !movieDbCtx.config) {
        return (
            <div className="movie-details-screen">
                <Spinner size="50" />
            </div>
        );
    }
    
    return (
        <>
            <h1>{props.rank ? <span>{props.rank}.</span> : null } {movieData.title} ({formatYear(movieData.release_date)})</h1>
            <blockquote>"{movieData.tagline}"</blockquote>
        </>
    );
}

export default MovieHeader;