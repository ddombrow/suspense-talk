import React, { Suspense, SuspenseList } from "react";
import MovieCredits from "./movie-credits";
import MoviePoster from "./movie-poster";
import MovieHeader from "./movie-header";
import MovieInfo from "./movie-info";
import { getNextLink, getPreviousLink } from "./movie-list";
import Spinner from "react-svg-spinner";

const MovieDetail = (props) => {
    const movieId = props.match.params.id;

    const rank = props.location.state && props.location.state.rank;

    const nextLink = getNextLink(rank);
    const previousLink = getPreviousLink(rank);

    return (
        <div className="movie-detail-screen">
            <SuspenseList revealOrder="forwards">
                { nextLink && <div className="movie-next">{ nextLink }</div>}
                { previousLink && <div className="movie-previous">{ previousLink }</div>}
                <div className="movie-detail-header">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        <MovieHeader id={movieId} rank={rank}/>
                    </Suspense>
                </div>
                <div className="movie-detail-poster">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        <MoviePoster id={movieId}/>
                    </Suspense>
                </div>
                <div className="movie-detail-item">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        <MovieInfo id={movieId}/>
                    </Suspense>
                </div>
                <div className="movie-detail-item">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        <MovieCredits id={movieId} />
                    </Suspense>
                </div>
            </SuspenseList>
        </div>
    );
}

export default MovieDetail;