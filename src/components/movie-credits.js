import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { MovieDbContext } from "./moviedb";
import Spinner from "react-svg-spinner";

const MovieCredits = (props) => {
    const movieDbCtx = useContext(MovieDbContext);
    const [credits, setCredits] = useState(null);
    useEffect(() => {
        axios.get(`${movieDbCtx.apiBaseUrl}/movie/${props.id}/credits`, {
            headers: {
                authorization: `Bearer ${movieDbCtx.apiBearer}`
            }
        })
        .then(({data: credits}) => {
            setCredits(credits);
        })
    }, [props.id]);

    if (!credits || !movieDbCtx.config) {
        return <>
            <Spinner size="200" />
        </>;
    }

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