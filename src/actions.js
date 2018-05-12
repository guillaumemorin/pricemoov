/* eslint-disable no-undef */

import {get} from './fetcher';

export default {
    agency: {
        list: () =>
            new Promise(resolve => get('agencies').then(res => resolve(res)))
    },
    category: {
        list: agency =>
            new Promise(resolve =>
                get(`agencies/${agency}/categories`).then(res => resolve(res))
            )
    },
    price: {
        list: (agency, category) =>
            new Promise(resolve =>
                get(`agencies/${agency}/categories/${category}/prices`).then(
                    res => resolve(res)
                )
            )
    }
};
