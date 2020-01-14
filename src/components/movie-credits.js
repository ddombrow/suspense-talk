import React from "react";

const MovieCredits = (props) => {
    const credits = props.resource.read();
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