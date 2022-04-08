const cache = {};

export default function api(args = {}) {
  // Filter args with no value.
  const params = Object.keys(args).reduce((result, key) => {
    if (args[key]) {
      result[key] = args[key];
    }
    return result
  }, {});

  const url = 'http://localhost:8081/search?' + new URLSearchParams(params);
  const clearFailedPromise = () => { cache[url] = null };

  if (!cache[url]) {
    cache[url] = fetch(url)
      .then(res => res.json(), clearFailedPromise)
      .then(res => res.results);
  }

  return cache[url];
}