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
    gotoPage,
    pageCount,
    state,
    prepareRow
   } = useTable({
    columns: columns,
     data: information,
     initialState: {
      
    }
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
          </strong> { ' ' }
        </span>
        <span>
          | Number: {' '}
          <input type='number' defaultValue={pageIndex + 1} onChange={(e) => {
            const number = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(number);
          }} style={{ width: '50px' }} />
        </span>
        <button onClick={() => gotoPage(0)} disabled={ !canPreviousPage }>{ '<<' }</button>
        <button onClick={() => previousPage()} disabled={ !canPreviousPage }>Prev</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={ !canNextPage }>{ '>>' }</button>
      </div>
    </React.Fragment>
  )
}

export default PaginationTable