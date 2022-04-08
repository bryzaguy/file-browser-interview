import * as React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

export default function Background({ children }) {
  return (
    <Box
      width='100%'
      minHeight='100vh'
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900]
      }}>
        {children}
    </Box>
  )
}

Background.propTypes = {
  children: PropTypes.element.isRequired
}
