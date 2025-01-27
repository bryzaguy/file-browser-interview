import * as React from 'react';
import PropTypes from 'prop-types';
import FetchableList from './FetchableList';
import FetchableInput from './FetchableInput';
import FileViewer from './FileViewer';

export default function FileExplorer({ api }) {
  const [prefix, setPrefix] = React.useState('');
  const [count, setCount] = React.useState(null);
  const [selected, setSelected] = React.useState(null);
  const [viewFile, setViewFile] = React.useState(false);
  const { get: runSearch, ...search } = api.useSearch();
  const staticContent = api.useStaticContent();

  React.useEffect(
    () => runSearch({ prefix, count }),
    [runSearch, prefix, count]
  );

  return (
    viewFile ? (
      <FileViewer
        name={selected}
        content={staticContent.data}
        onBackButton={() => setViewFile(false)}
        errorMessage={staticContent.error}
        loading={staticContent.loading}
      />
    ) : (
      <FetchableList
        items={search.data}
        renderInput={(props) => (
          <FetchableInput
            {...props}
            errorMessage={search.error}
            loading={search.loading}
            value={prefix}
            onChange={e => setPrefix(e.target.value)}
          />
        )}
        selected={selected}
        onSelect={setSelected}
        onSubmit={() => {
          setViewFile(true);
          staticContent.get(selected);
        }}
        count={count}
        onCountChange={setCount}
      />
    )
  )
}

FileExplorer.propTypes = {
  api: PropTypes.object.isRequired
}
