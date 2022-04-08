import * as React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FileExplorer from './components/FileExplorer';
import Background from './components/Background';
import Container from './components/Container';

export default function App({ api }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mdTheme = createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light'
    }
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <Background>
        <Container>
          <FileExplorer api={api} />
        </Container>
      </Background>
    </ThemeProvider>
  );
}

App.propTypes = {
  api: PropTypes.object.isRequired
}

