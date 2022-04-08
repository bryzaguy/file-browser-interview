import ErrorIcon from '@mui/icons-material/Error';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { CircularProgress, Input, InputAdornment, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

export default function FetchingInput({ onChange, errorMessage, loading }) {
  return (
    <Input
      fullWidth
      disableUnderline
      autoFocus
      startAdornment={
        <InputAdornment position="start">
          <FilterAltOutlinedIcon />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          {loading ? <CircularProgress size='1rem' /> : (
            errorMessage && <Tooltip title={errorMessage}><ErrorIcon color='error' /></Tooltip>
          )}
        </InputAdornment>
      }
      onChange={onChange}
    />
  )
}

FetchingInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool
};
