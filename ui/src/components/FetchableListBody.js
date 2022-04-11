import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PropTypes from 'prop-types';
import React from 'react';

export default function FilterableListBody({ items, selected, onSelect, onSubmit }) {
  const removeLastBorder = { '&:last-child td': { border: 0 } };
  const alignContent = { display: 'flex', alignItems: 'flex-end' };

  React.useLayoutEffect(() => {
    if (selected) {
      var item = document.querySelector(`[data-id="${selected}"]`);
      item && item.scrollIntoView({behavior: 'smooth', block: 'nearest'});
    }
  }, [selected])

  return (
    <TableBody>
      {items.map(name => {
        return (
          <TableRow
            data-id={name}
            key={name}
            sx={removeLastBorder}
            selected={selected === name}
            onClick={() => onSubmit(name)}
            onMouseEnter={() => onSelect(name)}
          >
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
  )
}

FilterableListBody.propTypes = {
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.string)
};
