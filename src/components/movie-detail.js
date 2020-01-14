import React from "react";
import MovieCredits from "./movie-credits";
import MoviePoster from "./movie-poster";
import MovieHeader from "./movie-header";
import MovieInfo from "./movie-info";
import { getNextLink, getPreviousLink } from "./movie-list";

const MovieDetail = (props) => {
    const movieId = props.match.params.id;

    const rank = props.location.state && props.location.state.rank;

    const nextLink = getNextLink(rank);
    const previousLink = getPreviousLink(rank);

    return (
        <div className="movie-detail-screen">
            { nextLink && <div className="movie-next">{ nextLink }</div>}
            { previousLink && <div className="movie-previous">{ previousLink }</div>}
            <div className="movie-detail-header">
               <MovieHeader id={movieId} rank={rank}/>
            </div>
            <div className="movie-detail-poster">
                <MoviePoster id={movieId}/>
            </div>
            <div className="movie-detail-item">
                <MovieInfo id={movieId}/>
            </div>
            <div className="movie-detail-item">
                <MovieCredits id={movieId} />
            </div>
        </div>
    );
}

export default MovieDetail;