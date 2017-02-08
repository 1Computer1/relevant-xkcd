const request = require('superagent');

const BASE_URL = 'https://xkcd.com';
const URL_PATH = '/info.0.json';

const RELEVANT_URL = 'https://relevantxkcd.appspot.com/process?action=xkcd&query=';
const EXPLAIN_URL = 'http://www.explainxkcd.com/wiki/index.php';

/**
 * Fetches a comic.
 * @param {number} [id] - ID of the comic. Leave empty for current comic.
 * @returns {Promise<Comic>}
 */
module.exports.fetchComic = (id) => {
    if (!id) return this.fetchCurrent();
    if (id) id = `/${id}`;

    return request.get(`${ BASE_URL }${ id }${ URL_PATH }`)
    .then(res => new this.Comic(res.body));
};

/**
 * Fetches the current comic.
 * @returns {Promise<Comic>}
 */
module.exports.fetchCurrent = () => {
    return request.get(`${ BASE_URL }${ URL_PATH }`)
    .then(res => new this.Comic(res.body));
};

/**
 * Fetches a relevant comic.
 * @param {string} query - Text to query.
 * @returns {Promise<Comic>}
 */
module.exports.fetchRelevant = (query) => {
    return request.get(`${ RELEVANT_URL }${ query }`)
    .then(res => {
        const id = res.text.split(' ').slice(2)[0].trim();
        return this.fetchComic(id);
    });
};

/**
 * Fetches all relevant comics.
 * @param {string} query - Text to query.
 * @returns {Promise<Comic[]>}
 */
module.exports.fetchAllRelevant = (query) => {
    return request.get(`${ RELEVANT_URL }${ query }`)
    .then(res => {
        const ids = res.text.split(' ').slice(2).filter((x, i) => i % 2 === 0);
        return Promise.all(ids.map(id => this.fetchComic(id.trim())));
    });
};

module.exports.Comic = class Comic {
    constructor(data = {}){
        /**
         * ID of comic.
         * @type {number}
         */
        this.id = data.num;

        /**
         * Day published.
         * Incorrect for old comics.
         * @type {number}
         */
        this.day = parseInt(data.day);

        /**
         * Month published.
         * Incorrect for old comics.
         * @type {number}
         */
        this.month = parseInt(data.month);

        /**
         * Year published.
         * Incorrect for old comics.
         * @type {number}
         */
        this.year = parseInt(data.year);

        /**
         * Date published.
         * Incorrect for old comics.
         * @type {Date}
         */
        this.date = new Date(this.year, this.month - 1, this.day);

        /**
         * Title of comic.
         * @type {string}
         */
        this.title = data.title;

        /**
         * Safe title of comic.
         * @type {string}
         */
        this.safeTitle = data.safe_title;

        /**
         * Comic transcript.
         * May be unavailable for newer comics.
         * @type {string}
         */
        this.transcript = data.transcript;

        /**
         * Comic alt-text.
         * @type {string}
         */
        this.altText = data.alt;

        /**
         * URL to image.
         * @type {string}
         */
        this.imageURL = data.img;

        /**
         * URL to XKCD page.
         * @type {string}
         */
        this.xkcdURL = `${ BASE_URL }/${ this.id }`;

        /**
         * URL to explain xkcd page.
         * @type {string}
         */
        this.explainURL = `${ EXPLAIN_URL }/${ this.id }`;
    }

    /**
     * Fetches image.
     * @type {Promise<Buffer>}
     */
    fetchImage(){
        return request.get(this.imageURL).then(res => res.body);
    }
};
