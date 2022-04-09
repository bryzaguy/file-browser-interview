import * as React from 'react';
const cache = {};

function cachedFetch(url, onSuccess) {
  const onFailure = (e) => { cache[url] = null; throw e };
  cache[url] = cache[url] || fetch(url).then(onSuccess, onFailure);
  return cache[url];
}

export default function useCachedFetch(defaultData) {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [initialData] = React.useState(defaultData);
  const [data, setData] = React.useState(initialData);
  const [promise, setPromise] = React.useState(null);

  const fetch = React.useCallback((url, onSuccess) => {
    setPromise(cachedFetch(url, onSuccess));
  }, []);

  React.useEffect(() => {
    if (!promise) return;

    setData(initialData);
    setLoading(true);
    setError('');

    var isLastestPromise = true;
    promise.then(result => {
      if (isLastestPromise) {
        setData(result);
        setLoading(false);
      }
    }, () => {
      if (isLastestPromise) {
        setError("There was a problem fetching data.");
        setLoading(false);
      }
    });

    return () => { isLastestPromise = false; };
  }, [promise, initialData]);

  return { fetch, loading, error, data };
}
