import React, { Suspense, SuspenseList, useEffect, useContext, useState } from "react";
import MovieCredits from "./movie-credits";
import MoviePoster from "./movie-poster";
import MovieHeader from "./movie-header";
import MovieInfo from "./movie-info";
import { getNextLink, getPreviousLink } from "./movie-list";
import Spinner from "react-svg-spinner";
import { MovieDbContext } from "./moviedb";
import { MovieInfoResource, MovieCreditsResource, MovieImagesResource} from "../lib/resources";

const MovieDetail = (props) => {
    const movieId = props.match.params.id;

    const rank = props.location.state && props.location.state.rank;

    const nextLink = getNextLink(rank);
    const previousLink = getPreviousLink(rank);

    const movieDbCtx = useContext(MovieDbContext);

    const [movieInfoResource, setMovieInfoResource] = useState(null);
    const [movieImagesResource, setMovieImagesResource] = useState(null);
    const [movieCreditsResource, setMovieCreditsResource] = useState(null);

    useEffect(() => {
        setMovieInfoResource(MovieInfoResource(movieId, movieDbCtx));
        setMovieImagesResource(MovieImagesResource(movieId, movieDbCtx));
        setMovieCreditsResource(MovieCreditsResource(movieId, movieDbCtx));
    },[ movieId, movieDbCtx ]);

    return (
        <div className="movie-detail-screen">
            <SuspenseList revealOrder="forwards">
                { nextLink && <div className="movie-next">{ nextLink }</div>}
                { previousLink && <div className="movie-previous">{ previousLink }</div>}
                <div className="movie-detail-header">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        { movieInfoResource && <MovieHeader id={movieId} resource={movieInfoResource} rank={rank}/> }
                    </Suspense>
                </div>
                <div className="movie-detail-poster">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        { movieImagesResource && <MoviePoster id={movieId} resource={movieImagesResource} /> }
                    </Suspense>
                </div>
                <div className="movie-detail-item">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        { movieInfoResource && <MovieInfo id={movieId} resource={movieInfoResource} /> }
                    </Suspense>
                </div>
                <div className="movie-detail-item">
                    <Suspense fallback={<Spinner color="fuchsia" size="150" />}>
                        { movieCreditsResource && <MovieCredits id={movieId} resource={movieCreditsResource} /> }
                    </Suspense>
                </div>
            </SuspenseList>
        </div>
    );
}

export default MovieDetail;