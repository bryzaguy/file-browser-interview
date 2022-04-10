import * as React from 'react';
import PropTypes from 'prop-types';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import FetchableInput from './FetchableInput';
import FetchableListBody from './FetchableListBody';
import ResultCount from './ResultCount';

export default function FilterableList(props) {
  const { prefix, selected, onSelect, onFilter, onSubmit, errorMessage, items, loading, count, onCountChange } = props;

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
                <FetchableInput
                  errorMessage={errorMessage}
                  value={prefix}
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
          <FetchableListBody items={items} selected={selected} />
        </Table>
      </TableContainer>
    </Paper>
  );
}

FilterableList.propTypes = {
  prefix: PropTypes.string,
  selected: PropTypes.string,
  onSelect: PropTypes.func,
  onFilter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  errorMessage: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  count: PropTypes.number,
  onCountChange: PropTypes.func.isRequired
};
