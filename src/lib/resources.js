import React from "react";
import createResource from "./create-resource";
import axios from "axios";

const movieInfoResourceCache = {};
const fetchMovieInfo = (movieId, movieDbCtx) => () => axios.get(`${movieDbCtx.apiBaseUrl}/movie/${movieId}`, {
    headers: {
        authorization: `Bearer ${movieDbCtx.apiBearer}`
    }
}).then(({data})=>data);
function MovieInfoResource(movieId, movieDbCtx) {
    let movieInfoResource = movieInfoResourceCache[movieId];
    if (!movieInfoResource) {
        movieInfoResource = createResource(fetchMovieInfo(movieId, movieDbCtx));
        movieInfoResourceCache[movieId] = movieInfoResource;
    }
    return movieInfoResource;
}

const movieImagesResourceCache = {};
const fetchMovieImages = (movieId, movieDbCtx) => () => axios.get(`${movieDbCtx.apiBaseUrl}/movie/${movieId}/images`, {
    headers: {
        authorization: `Bearer ${movieDbCtx.apiBearer}`
    }
}).then(({data})=>data);
function MovieImagesResource(movieId, movieDbCtx) {
    let movieImagesResource = movieImagesResourceCache[movieId];
    if (!movieImagesResource) {
        movieImagesResource = createResource(fetchMovieImages(movieId, movieDbCtx));
        movieImagesResourceCache[movieId] = movieImagesResource;
    }
    return movieImagesResource;
}

const movieCreditsResourceCache = {};
const fetchMovieCredits = (movieId, movieDbCtx) => () => axios.get(`${movieDbCtx.apiBaseUrl}/movie/${movieId}/credits`, {
    headers: {
        authorization: `Bearer ${movieDbCtx.apiBearer}`
    }
}).then(({data})=>data);
function MovieCreditsResource(movieId, movieDbCtx) {
    let movieCreditsResource = movieCreditsResourceCache[movieId];
    if (!movieCreditsResource) {
        movieCreditsResource = createResource(fetchMovieCredits(movieId, movieDbCtx));
        movieCreditsResourceCache[movieId] = movieCreditsResource;
    }
    return movieCreditsResource;
}

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

export {
    MovieInfoResource,
    MovieImagesResource,
    MovieCreditsResource,
    Img
}

