import React, { useMemo } from 'react';
import { useTable, usePagination } from 'react-table';

import './table.css';
import { COLUMNS } from './columns';
import Information from './information.json';

function PaginationTable() {

  const columns = useMemo(() => COLUMNS, []);
  const information = useMemo(() => Information, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow
   } = useTable({
    columns: columns,
    data: information
  },usePagination);

  const { pageIndex } = state;

  return (
    <React.Fragment>
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
            page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell) => {
                      return <td {...cell.getCellProps()}>{ cell.render('Cell') }</td>
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <div>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length} { ' ' }
          </strong>
        </span>
        <button onClick={() => previousPage()} disabled={ !canPreviousPage }>Prev</button>
        <button onClick={() => nextPage()} disabled={ !canNextPage }>Next</button>
      </div>
    </React.Fragment>
  )
}

export default PaginationTable