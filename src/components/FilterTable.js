import { useMemo } from 'react';
import { useTable } from 'react-table';

import './table.css';
import { COLUMNS } from './columns';
import Information from './information.json';

function FilterTable() {

  const columns = useMemo(() => COLUMNS, []);
  const information = useMemo(() => Information, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow } = useTable({
    columns: columns,
    data: information
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {
          headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps}>{ column.render('Header') }</th>
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
            return <tr {...row.getRowProps()}>
              {
                row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{ cell.render('Cell') }</td>
                ))
              }
            </tr>
          })
        }
      </tbody>
      <tfoot>
        {
          footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {
                footerGroup.headers.map((column) => (
                  <td {...column.getFooterProps()}>{ column.render('Header') }</td>
                ))
              }
            </tr>
          ))
        }
      </tfoot>
    </table>
  )
}

export default FilterTable