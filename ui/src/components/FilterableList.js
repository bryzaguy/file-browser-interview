import * as React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import FetchingInput from './FetchingInput';

export default function FilterableList({ onFilter, errorMessage, items }) {
  const removeLastBorder = { '&:last-child td': { border: 0 } };
  const alignContent = { display: 'flex', alignItems: 'flex-end' };

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table size='medium'>
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <FetchingInput errorMessage={errorMessage} onChange={onFilter} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(name => {
              return (
                <TableRow key={name} sx={removeLastBorder}>
                  <TableCell sx={alignContent}>
                    <InsertDriveFileOutlinedIcon />&nbsp; {name}
                  </TableCell>
                </TableRow>
              );
            })}
            {items.length === 0 && (
              <TableRow key={'empty'} sx={removeLastBorder}>
                <TableCell />
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
  items: PropTypes.arrayOf(PropTypes.string)
};
