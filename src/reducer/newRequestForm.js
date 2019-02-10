import {FETCH_OFFERS_FULFILLED,
    FETCH_OFFERS_REJECTED,
    FETCH_OFFERS_PENDING,
} from '../action/newRequestForm';

const initialState = {
    fetching: false,
    fetched: false,
    offers : [],
    error: {}
};
export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OFFERS_FULFILLED:
            return {
                ...state,
                offers : action.payload,
                fetching : false
            };
        case FETCH_OFFERS_REJECTED:
            return {
                ...state,
                error : action.payload,
                fetching : false
            };
        case FETCH_OFFERS_PENDING:
            return {
                ...state,
                fetching : true
            };
        default :
            return state;

    }
}
