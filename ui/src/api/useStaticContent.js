import * as React from 'react';
import useCachedFetch from './useCachedFetch';

const STATIC_URL = process.env.REACT_APP_STATIC_URL;

const getStaticUrl = name => `${STATIC_URL}${name}`;

export default function useStaticContent() {
  const { fetch, loading, error, data } = useCachedFetch(null);

  const get = React.useCallback(name => {
    const url = getStaticUrl(name);
    fetch(url, res => res.text());
  }, [fetch]);

  return { get, loading, error, data };
}
