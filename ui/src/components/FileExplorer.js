import * as React from 'react';
import PropTypes from 'prop-types';
import FilterableList from './FilterableList';
import FileViewer from './FileViewer';

var currentPromise = null;

export default function FileExplorer({ api }) {
  const [prefix, setPrefix] = React.useState('');
  const [items, setItems] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [count, setCount] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [fileContent, setFileContent] = React.useState(null);
  const [filename, setFilename] = React.useState(null);

  const onFetch = React.useCallback(function (promise, success) {
    setErrorMessage('');
    setLoading(true);
    currentPromise = promise;
    promise.then(result => {
      if (promise === currentPromise) {
        success(result);
        setLoading(false);
      }
    }, () => {
      if (promise === currentPromise) {
        setErrorMessage("There was a problem fetching data.");
        setLoading(false);
      }
    });
  }, []);

  // Calls the api initially and when prefix or count changes.
  React.useEffect(() => {
    setItems([]);
    onFetch(api.search({ prefix, count }), res => setItems(res.results));
  }, [prefix, count, api, onFetch]);

  return (
    filename ? (
      <FileViewer
        name={filename}
        content={fileContent}
        onBackButton={() => {
          setFilename(null);
          setFileContent(null);
          setLoading(false);
          setErrorMessage('');
        }}
        errorMessage={errorMessage}
        loading={loading}
      />
    ) : (
      <FilterableList
        items={items}
        onFilter={e => setPrefix(e.target.value)}
        prefix={prefix}
        selected={selected}
        onSelect={setSelected}
        onSubmit={() => {
          setFilename(selected);
          setFileContent(null);
          onFetch(api.staticContent(selected), setFileContent);
        }}
        errorMessage={errorMessage}
        loading={loading}
        count={count}
        onCountChange={setCount}
      />
    )
  )
}

FileExplorer.propTypes = {
  api: PropTypes.object.isRequired
}
