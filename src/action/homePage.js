import axios from 'axios';

export const FETCH_MOVIES_FULFILLED = 'FETCH_MOVIES_FULFILLED';
export const FETCH_MOVIES_REJECTED = 'FETCH_MOVIES_REJECTED';
export const  FETCH_MOVIES_PENDING = 'FETCH_MOVIES_PENDING';

export const DELETE_MOVIE_FULFILLED = 'DELETE_MOVIE_FULFILLED';
export const DELETE_MOVIE_REJECTED = 'DELETE_MOVIE_REJECTED';
export const DELETE_MOVIE_PENDING = 'DELETE_MOVIE_PENDING';


export function choosePhone(id) {

    return dispatch =>{

        dispatch ({
            type : "FETCH_MOVIES",
            payload : id

        })
    }
}
