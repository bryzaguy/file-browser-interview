import ErrorIcon from '@mui/icons-material/Error';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { CircularProgress, Input, InputAdornment, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

export default function FetchingInput({ value, onChange, onKeyDown, errorMessage, loading }) {
  return (
    <Input
      fullWidth
      disableUnderline
      autoFocus
      value={value}
      startAdornment={
        <InputAdornment position="start">
          <FilterAltOutlinedIcon />
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end">
          {loading ? <CircularProgress size='1rem' color='info' /> : (
            errorMessage && <Tooltip title={errorMessage}><ErrorIcon color='error' /></Tooltip>
          )}
        </InputAdornment>
      }
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  )
}

FetchingInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool
};
