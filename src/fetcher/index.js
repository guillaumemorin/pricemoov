import config from './config';

export const get = resource =>
    new Promise((resolve, reject) => {
        fetch(`${config.API_PROTOCOL}${config.API_URI}/${resource}`, {
            method: 'GET'
        })
            .then(response => resolve(response.json()))
            .catch(error => reject(error));
    });
