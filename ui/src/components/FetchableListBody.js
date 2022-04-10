import { Box, TableBody, TableCell, TableRow } from '@mui/material';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PropTypes from 'prop-types';

export default function FilterableListBody({items, selected}) {
  const removeLastBorder = { '&:last-child td': { border: 0 } };
  const alignContent = { display: 'flex', alignItems: 'flex-end' };

  return (
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
  )
}

FilterableListBody.propTypes = {
  selected: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string)
};
