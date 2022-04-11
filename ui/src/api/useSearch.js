import * as React from 'react';
import useCachedFetch from './useCachedFetch';

function removeEmptyKeys(args = {}) {
  return Object.keys(args).reduce((result, key) => {
    if (args[key]) {
      result[key] = args[key];
    }
    return result;
  }, {});
}

const SEARCH_URL = process.env.REACT_APP_SEARCH_URL;

function getSearchUrl(args) {
  const params = removeEmptyKeys(args);
  return `${SEARCH_URL}?${new URLSearchParams(params)}`;
}

export default function useSearch() {
  const { fetch, loading, error, data } = useCachedFetch([]);

  const get = React.useCallback(args => {
    const url = getSearchUrl(args);
    fetch(url, res => res.json().then(json => json.results));
  }, [fetch]);

  return { get, loading, error, data };
}
