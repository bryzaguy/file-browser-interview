import * as React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Box, Button, Input, Paper } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function FileViewer({ name, content, onBackButton, loading, errorMessage }) {
  const onKeyDown = event => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      onBackButton();
    }
  };

  return (
    <Paper elevation={3}>
      <Box overflow='hidden' height={0}>
        <Input autoFocus onKeyDown={onKeyDown} />
      </Box>
      <Box padding='1rem'>
        <Button
          variant='outlined'
          color='inherit'
          aria-label='back'
          onClick={onBackButton}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>&nbsp;&nbsp; {name}
      </Box>
      <Paper sx={{ padding: '1rem' }}>
        {loading || errorMessage ? (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              {loading && <CircularProgress sx={{padding: '2rem'}} color='inherit' />}
              {errorMessage && <ErrorIcon color='error' />} &nbsp; {errorMessage}
            </Box>
          ) : (
            <pre style={{ overflow: 'scroll' }}>{content}</pre>
        )}
      </Paper>
    </Paper>
  )
}

FileViewer.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  onBackButton: PropTypes.func.isRequired
};
