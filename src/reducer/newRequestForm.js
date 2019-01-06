import {FETCH_MOVIES_FULFILLED,
    FETCH_MOVIES_REJECTED,
    FETCH_MOVIES_PENDING,
    DELETE_MOVIE_PENDING,
    DELETE_MOVIE_FULFILLED,
    DELETE_MOVIE_REJECTED
} from '../action/newRequestForm';

const initialState = {
    fetching: false,
    fetched: false,
    selectedPhoneLabel: '',
    selectedPhoneId: '',
    error: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_FULFILLED:
            return {
                ...state,
                movies : action.payload,
                fetching : false
            };
        case FETCH_MOVIES_REJECTED:
            return {
                ...state,
                error : action.payload,
                fetching : false
            };
        case FETCH_MOVIES_PENDING:
            return {
                ...state,
                fetching : true
            };
        // DELETE_MOVIE
        case DELETE_MOVIE_PENDING:
            return {
                ...state,
            };
        case DELETE_MOVIE_FULFILLED:
            return {
                ...state,
                movies: state.movies.filter(item => item._id !== action.payload.id),
            };
        case DELETE_MOVIE_REJECTED:
            return {
                ...state,
                error: action.payload,
            };
        default :
            return state;

    }
}
