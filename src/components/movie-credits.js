import React, { useContext } from "react";
import { MovieDbContext } from "./moviedb";
import axios from "axios";
import useSWR from "swr";

const MovieCredits = (props) => {
    const movieDbCtx = useContext(MovieDbContext);
    const fetcher = query => (axios.get(query, {
        headers: {
            authorization: `Bearer ${movieDbCtx.apiBearer}`
        }
    }).then(({data}) => (data)));
    const { data: credits } = useSWR(`${movieDbCtx.apiBaseUrl}/movie/${props.id}/credits`, fetcher, { suspense: true });

    return (
        <>
            <h2>Credits</h2>
            <hr/>
            <p>
                <strong>Director: </strong>
                {
                    credits.crew.find(c => {
                        return c.job === "Director"
                    }).name
                }
            </p>
            <h3>Cast</h3>
            {
                credits.cast.slice(0, 17).map(cm => {
                return <p className="cast-member" key={cm.cast_id}><strong>{cm.character}</strong> - {cm.name}</p>
                })
            }
            ...
        </>
    );
};

export default MovieCredits;