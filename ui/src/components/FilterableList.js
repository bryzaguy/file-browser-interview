import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FetchingInput from './FetchingInput';
import ResultCount from './ResultCount';

export default function FilterableList({ onFilter, errorMessage, items, loading, count, onCountChange }) {
  const removeLastBorder = { '&:last-child td': { border: 0 } };
  const alignContent = { display: 'flex', alignItems: 'flex-end' };
  const [selected, setSelected] = React.useState(null);

  const onNavigationKeyPress = e => {
    const index = items.indexOf(selected);
    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        // If past the end, wrap to beginning of list.
        setSelected(items[(index + 1) % items.length]);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        // Wrap to end of list from the beginning.
        setSelected(items[index <= 0 ? items.length - 1 : index - 1]);
        break;
      }
      default:
        break;
    }
  }

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table size='medium'>
          <TableHead>
            <TableRow>
              <TableCell>
                <FetchingInput
                  errorMessage={errorMessage}
                  onChange={onFilter}
                  onKeyDown={onNavigationKeyPress}
                  loading={loading}
                />
              </TableCell>
              <TableCell width={200}>
                <ResultCount
                  value={count}
                  onChange={onCountChange}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(name => {
              return (
                <TableRow key={name} sx={removeLastBorder} selected={selected === name} >
                  <TableCell colSpan={3}>
                    <Box sx={alignContent}>
                      <InsertDriveFileOutlinedIcon />&nbsp; {name}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
            {items.length === 0 && (
              <TableRow key={'empty'} sx={removeLastBorder}>
                <TableCell colSpan={3} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

FilterableList.propTypes = {
  onFilter: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  count: PropTypes.number,
  onCountChange: PropTypes.func.isRequired
};
