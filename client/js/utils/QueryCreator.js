class QueryCreator {

    static create(obj) {
        const queries = Object.keys(obj).map((key) => `${key}=${obj[key]}`);
        return `?${queries.join('&')}`;
    }

}

export default QueryCreator;
