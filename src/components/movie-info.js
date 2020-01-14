import React, { useContext } from "react";
import { MovieDbContext } from "./moviedb";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import useSWR from "swr";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

const MovieInfo = (props) => {
    const movieDbCtx = useContext(MovieDbContext);
    const fetcher = query => (axios.get(query, {
        headers: {
            authorization: `Bearer ${movieDbCtx.apiBearer}`
        }
    }).then(({data}) => (data)));
    const { data: movieData } = useSWR(`${movieDbCtx.apiBaseUrl}/movie/${props.id}`, fetcher, { suspense: true });
    
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