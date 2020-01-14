import React, { useContext } from "react";
import { MovieDbContext } from "./moviedb";
import axios from "axios";
import useSWR from "swr";
import createResource from "../lib/create-resource";

// Image preloading code pulled from Kent C. Dodds suspense workshop
// https://codesandbox.io/s/github/kentcdodds/concurrent-react/
function preloadImage(src) {
    return new Promise(resolve => {
      const img = document.createElement("img");
      img.src = src;
      img.onload = () => resolve(src);
      return true;
    });
}

const imgSrcResourceCache = {};
function Img({src, alt, ...props}) {
    let imgSrcResource = imgSrcResourceCache[src];
    if (!imgSrcResource) {
      imgSrcResource = createResource(() => preloadImage(src))
      imgSrcResourceCache[src] = imgSrcResource
    }
    return <img src={imgSrcResource.read()} alt={alt} {...props} />
}

const MoviePoster = (props) => {
    const movieDbCtx = useContext(MovieDbContext);
    const fetcher = query => (axios.get(query, {
        headers: {
            authorization: `Bearer ${movieDbCtx.apiBearer}`
        }
    }).then(({data}) => (data)));
    const { data: images } = useSWR(`${movieDbCtx.apiBaseUrl}/movie/${props.id}/images`, fetcher, { suspense: true });
    const posterUrl = `${movieDbCtx.config.images.base_url}${movieDbCtx.config.images.poster_sizes[4]}${images.posters[0].file_path}`;

    return (
        <div>
            <Img src={posterUrl} alt={"Movie Poster"} />
        </div>
    );
};

export default MoviePoster;