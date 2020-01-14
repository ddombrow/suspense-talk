
import React, { useContext } from "react";
import { MovieDbContext } from "./moviedb";
import axios from "axios";
//import useSWR from "swr";

// 🚨 This should NOT be copy/pasted for production code and is only here
// for experimentation purposes. The API for suspense (currently throwing a
// promise) is likely to change before suspense is officially released.
// This was strongly inspired by work done in the React Docs by Dan Abramov
function createResource(asyncFn) {
    let status = "pending";
    let result;
    let promise = asyncFn().then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    )
    return {
        read: () => {  
            if (status === "pending") throw promise;
            if (status === "error") throw result;
            if (status === "success") return result;
            throw new Error("This should be impossible");
        }
    }
}

function formatYear(releaseDate) {
    return releaseDate.split("-")[0];
}

const fetchMovieInfo = (movieId, movieDbCtx) => () => axios.get(`${movieDbCtx.apiBaseUrl}/movie/${movieId}`, {
    headers: {
        authorization: `Bearer ${movieDbCtx.apiBearer}`
    }
}).then(({data})=>data);

const movieInfoResourceCache = {};
function MovieInfoResource(movieId, movieDbCtx) {
    let movieInfoResource = movieInfoResourceCache[movieId];
    if (!movieInfoResource) {
        const newMovieInfoResource = createResource(fetchMovieInfo(movieId, movieDbCtx));
        movieInfoResourceCache[movieId] = newMovieInfoResource;
    }
    return movieInfoResource;
}

const MovieHeader = (props) => {
    const movieId = props.id;
    const movieDbCtx = useContext(MovieDbContext);
    /*const fetcher = query => (axios.get(query, {
        headers: {
            authorization: `Bearer ${movieDbCtx.apiBearer}`
        }
    }).then(({data}) => (data)));
    const { data: movieData } = useSWR(`${movieDbCtx.apiBaseUrl}/movie/${movieId}`, fetcher, { suspense: true });*/
    const movieData = MovieInfoResource(movieId, movieDbCtx).read();
    return (
        <>
            <h1>{props.rank ? <span>{props.rank}.</span> : null } {movieData.title} ({formatYear(movieData.release_date)})</h1>
            <blockquote>"{movieData.tagline}"</blockquote>
        </>
    );
}

export default MovieHeader;