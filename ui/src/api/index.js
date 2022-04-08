const cache = {};
var controller = new AbortController();
var currentUrl = null

export default function api(args = {}) {
  // Filter args with no value.
  const params = Object.keys(args).reduce((result, key) => {
    if (args[key]) {
      result[key] = args[key];
    }
    return result
  }, {});

  const url = 'http://localhost:8081/search?' + new URLSearchParams(params);
  const clearFailedPromise = (e) => { cache[url] = null; throw e };
  if (currentUrl !== url) {
    controller.abort();
  }

  currentUrl = url;
  controller = new AbortController();
  const { signal } = controller;

  cache[url] = cache[url] || fetch(url, { signal })
    .then(res => res.json(), clearFailedPromise)
    .then(res => res.results);

  return cache[url];
}