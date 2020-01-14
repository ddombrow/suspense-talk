import React, { useState, useEffect } from "react";
import axios from "axios";
import { movieDbBearerToken } from "../keys-real.js";

export const MovieDbContext = React.createContext(null);

export const movieDbApiBaseUrl = `https://api.themoviedb.org/3`;

function MovieDb(props) {
    const { children } = props;
    let [movieDbConfig, setMovieDbConfig] = useState(null);
    useEffect(() => {
        axios.get(`${movieDbApiBaseUrl}/configuration`, {
            headers: {
                authorization: `Bearer ${movieDbBearerToken}`
            }
        })
        .then(({data: config}) => {
            setMovieDbConfig(config);
        });
    }, []);

    return (
        <MovieDbContext.Provider value = {{
            apiBaseUrl: movieDbApiBaseUrl,
            apiBearer: movieDbBearerToken,
            config: movieDbConfig
        }}>
            {children}
        </MovieDbContext.Provider>
    );
}

export default MovieDb;