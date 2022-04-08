import * as React from 'react';
import PropTypes from 'prop-types';
import FilterableList from './components/FilterableList';
import { Box, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function App({ api }) {
  const [prefix, setPrefix] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState(null);

  // Calls the api initially and when prefix changes.
  React.useEffect(() => {
    setItems([]);
    setErrorMessage('');
    api({ prefix }).then(
      result => { setItems(result) },
      () => setErrorMessage("Problem loading data.")
    );
  }, [prefix, api]);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mdTheme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light'
    }
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <Box
        width='100%'
        minHeight='100vh'
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]
        }}>
        <Box maxWidth={800} p='1rem'
          sx={{ 'margin': 'auto' }}
          noValidate
          autoComplete="off"
        >
          <FilterableList
            items={items}
            onFilter={e => setPrefix(e.target.value)}
            errorMessage={errorMessage}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

App.propTypes = {
  api: PropTypes.func.isRequired
}

