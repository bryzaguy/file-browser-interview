const cache = {};

const SEARCH_URL = process.env.REACT_APP_SEARCH_URL;
const STATIC_URL = process.env.REACT_APP_STATIC_URL;

function sleep(result, ms) {
  // add ms millisecond timeout before promise resolution
  return new Promise(resolve => setTimeout(() => resolve(result), ms));
}

function cachedFetch(url, thenCb) {
  const onFailure = (e) => { cache[url] = null; throw e };

  cache[url] = cache[url] || fetch(url)
    .then(res => thenCb(res), onFailure)
    .then(res => sleep(res, 2000));

  return cache[url];
}

const api = {
  search(args = {}) {
    // Filter args with no value.
    const params = Object.keys(args).reduce((result, key) => {
      if (args[key]) {
        result[key] = args[key];
      }
      return result;
    }, {});

    const url = `${SEARCH_URL}?${new URLSearchParams(params)}`;
    return cachedFetch(url, res => res.json());
  },
  staticContent(name) {
    return cachedFetch(`${STATIC_URL}/${name}`, res => res.text());
  }
};

export default api;