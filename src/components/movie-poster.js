import React, { useContext } from "react";
import { MovieDbContext } from "./moviedb";
import { Img } from "../lib/resources";

const MoviePoster = (props) => {
    const movieDbCtx = useContext(MovieDbContext);
    const images = props.resource.read();
    const posterUrl = `${movieDbCtx.config.images.base_url}${movieDbCtx.config.images.poster_sizes[4]}${images.posters[0].file_path}`;

    return (
        <div>
            <Img src={posterUrl} alt={"Movie Poster"} />
        </div>
    );
};

export default MoviePoster;