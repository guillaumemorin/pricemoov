import config from './config';

export default (resource) => new Promise(
    (resolve, reject) => {
        fetch(
            `${config.API_PROTOCOL}${config.API_URI}/${resource}`,
            {method: 'GET'}
        )
        .then((response) => resolve(response.json()))
        .catch((error) => reject(error))
});
