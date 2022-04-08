import ErrorIcon from '@mui/icons-material/Error';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Input, InputAdornment, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

export default function FetchingInput({ onChange, errorMessage }) {
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
          {errorMessage && <Tooltip title={errorMessage}><ErrorIcon color='error' /></Tooltip>}
        </InputAdornment>
      }
      onChange={onChange}
    />
  )
}

FetchingInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};
