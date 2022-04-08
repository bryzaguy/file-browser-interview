import * as React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function Container({ children }) {
  return (
    <Box maxWidth={800} p='1rem'
      sx={{ 'margin': 'auto' }}
      noValidate
      autoComplete="off"
    >
        {children}
    </Box>
  )
}

Container.propTypes = {
  children: PropTypes.element.isRequired
}
