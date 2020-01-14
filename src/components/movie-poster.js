import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MovieDbContext } from "./moviedb";
import Spinner from "react-svg-spinner";

const MoviePoster = (props) => {
    const movieDbCtx = useContext(MovieDbContext);
    const [images, setImages] = useState(null);
    useEffect(() => {
        axios.get(`${movieDbCtx.apiBaseUrl}/movie/${props.id}/images`, {
            headers: {
                authorization: `Bearer ${movieDbCtx.apiBearer}`
            }
        })
        .then(({data: images}) => {
            setImages(images);
        })
    }, [props.id]);

    if (!images || !movieDbCtx.config) {
        return (
            <>
                <Spinner size="300" />
            </>
        );
    }

    const posterUrl = `${movieDbCtx.config.images.base_url}${movieDbCtx.config.images.poster_sizes[4]}${images.posters[0].file_path}`;
    return (
        <div>
            <img src={posterUrl}/>
        </div>
    );
};

export default MoviePoster;