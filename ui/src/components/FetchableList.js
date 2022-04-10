import * as React from 'react';
import PropTypes from 'prop-types';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FetchableListBody from './FetchableListBody';
import ResultCount from './ResultCount';

export default function FilterableList(props) {
  const { renderInput, selected, onSelect, onSubmit, items, count, onCountChange } = props;

  const onNavigationKeyPress = event => {
    const index = items.indexOf(selected);

    const keys = {
      'ArrowDown': () => onSelect(items[(index + 1) % items.length]),
      'ArrowUp': () => onSelect(items[index <= 0 ? items.length - 1 : index - 1]),
      'Enter': () => index > -1 && onSubmit()
    };

    if (['ArrowDown', 'ArrowUp', 'Enter'].indexOf(event.key) > -1) {
      event.preventDefault();
      const navigate = keys[event.key];
      navigate();
    }
  };

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table size='medium'>
          <TableHead>
            <TableRow>
              <TableCell>
                {renderInput({ onKeyDown: onNavigationKeyPress })}
              </TableCell>
              <TableCell width={200}>
                <ResultCount
                  value={count}
                  onChange={onCountChange}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <FetchableListBody items={items} selected={selected} />
        </Table>
      </TableContainer>
    </Paper>
  );
}

FilterableList.propTypes = {
  renderInput: PropTypes.func,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  onSubmit: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  onCountChange: PropTypes.func.isRequired
};
