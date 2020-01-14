import React from "react";
import { Link } from "react-router-dom";

export const movieList = [
    {
        title: "Alien",
        year: 1979,
        id: 348,
        rank: 1
    },
    {
        title: "Jaws",
        year: 1975,
        id: 578,
        rank: 2
    },
    {
        title: "The Sixth Sense",
        year: 1999,
        id: 745,
        rank: 3
    },
    {
        title: "Silence of the Lambs",
        year: 1991,
        id: 274,
        rank: 4
    },
    {
        title: "Get Out",
        year: 2017,
        id: 419430,
        rank: 5
    },
    {
        title: "Memento",
        year: 2000,
        id: 77,
        rank: 6
    },
    {
        title: "Shutter Island",
        year: 2010,
        id: 11324,
        rank: 7
    },
    {
        title: "Se7en",
        year: 1995,
        id: 807,
        rank: 8
    },
    {
        title: "The Birds",
        year: 1963,
        id: 571,
        rank: 9
    },
    {
        title: "The Imitation Game",
        year: 2014,
        id: 205596,
        rank: 10
    }
];

const getNext = (list, i) => {
    if (i+1 === list.length) {
        return null;
    }
    return list[i+1];
};
const getPrevious = (list, i) => {
    if (i-1 < 0) {
        return null;
    }
    return list[i-1];
};

export const getNextLink = (rank) => {
    if (!rank || rank === movieList.length) {
        return null;
    }
    const currentIndex = rank-1;
    const next = getNext(movieList, currentIndex);
    const nextNext = getNext(movieList, currentIndex+1);
    const previous = getPrevious(movieList, currentIndex-1);
    return <Link to={{
        pathname: `/movie/${next.id}`,
        state: {
            next: nextNext,
            previous,
            rank: next.rank
        }
    }}>{next.title}</Link>
};
export const getPreviousLink = (rank) => {
    if (!rank || rank === 1) {
        return null;
    }
    const currentIndex = rank-1;
    const previous = getPrevious(movieList, currentIndex);
    const previousPrevious = getPrevious(movieList, currentIndex-1);
    const next = getNext(movieList, currentIndex-1);
    return <Link to={{
        pathname: `/movie/${previous.id}`,
        state: {
            next,
            previous: previousPrevious,
            rank: previous.rank
        }
    }}>{previous.title}</Link>
};

const MovieList = (props) => {
    return (
        <div className="movie-list-screen">
            <h1>My Top 10 Suspenseful Films</h1>
            <hr/>
            <ol>
                { 
                    movieList.map((ml, index) => {
                        return <li key={ml.id}><Link to={{
                            pathname: `/movie/${ml.id}`,
                            state: {
                                next: getNext(movieList, index),
                                previous: getPrevious(movieList, index),
                                rank: index+1
                            }
                        }}>{ml.title} ({ml.year})</Link></li>
                    })
                }
            </ol>
        </div>
    );
}

export default MovieList;