import { useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './table.css';
import { COLUMNS } from './columns';
import Information from './information.json';

function SortedTable() {

  const columns = useMemo(() => COLUMNS, []);
  const information = useMemo(() => Information, []);

  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = useTable({
    columns: columns,
    data: information
  },useSortBy)

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {
                        column.isSorted ? (column.isSortedDesc ? <FontAwesomeIcon icon="fa-solid fa-sort-up" /> : <FontAwesomeIcon icon="fa-solid fa-sort-down" />): ''
                      }
                    </span>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()}>
        {
          rows.map((row) => {
            prepareRow(row);
            return(
              <tr {...row.getRowProps()}>
                {
                  row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{ cell.render('Cell') }</td>
                  ))
                }
              </tr>)
          })
        }
      </tbody>
      <tfoot>
        {
          footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {
                footerGroup.headers.map((column) => (
                  <td {...column.getFooterProps()}>{ column.render('Footer') }</td>
                ))
              }
            </tr>
          ))
        }
      </tfoot>
    </table>
  )
}

export default SortedTable