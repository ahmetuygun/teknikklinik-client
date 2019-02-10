import {ACCESS_TOKEN, API_BASE_URL} from '../constants';
import axios from 'axios';
import { request } from '../util/APIUtils';

export const FETCH_OFFERS_FULFILLED = 'FETCH_OFFERS_FULFILLED';
export const FETCH_OFFERS_REJECTED = 'FETCH_OFFERS_REJECTED';
export const  FETCH_OFFERS_PENDING = 'FETCH_OFFERS_PENDING';


export function fetchOffers(id) {

    return dispatch => {

        dispatch ({
            type : "FETCH_OFFERS",
            payload : axios.get(API_BASE_URL + "/offer/" + id)
                .then(result => result.data)

        })
    }
}
