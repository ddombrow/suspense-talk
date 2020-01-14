import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Spinner from "react-svg-spinner";
import { MovieDbContext } from "./moviedb";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const MovieInfo = (props) => {
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
                <Spinner size="500" />
            </div>
        );
    }
    
    return (
        <>
            <h2>Details</h2>
            <hr/>
            <div className="movie-detail-rating">
                <CircularProgressbar styles={{
                    path: {
                        stroke: `rgba(20, 200, 0, ${movieData.vote_average / 10})`,
                    },
                    text: {
                        fill: '#ffffff'
                    }
                }} value={movieData.vote_average * 10} text={`${movieData.vote_average}`} />
                <br/><br/>
                <strong>out of {movieData.vote_count} user ratings</strong> 
            </div>
            <p>{movieData.overview}</p>
            <p><strong>Genres:</strong> {movieData.genres.map(g => {
            return <span className="genre-tag" key={g.id}>{g.name}</span>
            })} </p>
            <p><strong>Length:</strong> {movieData.runtime} minutes</p>
            <p><strong>Released:</strong> {movieData.release_date}</p>
            <p><strong>Budget:</strong> {currency.format(movieData.budget)}</p>
            <p><strong>Revenue:</strong> {currency.format(movieData.revenue)}</p>
        </>
    );
}

export default MovieInfo;