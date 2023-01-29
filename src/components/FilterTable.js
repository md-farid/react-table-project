import React, { useMemo } from 'react';
import { useTable, useGlobalFilter } from 'react-table';

import './table.css';
import { COLUMNS } from './columns';
import Information from './information.json';
import GlobalFilter from './GlobalFilter';

function FilterTable() {

  const columns = useMemo(() => COLUMNS, []);
  const information = useMemo(() => Information, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter} = useTable({
    columns: columns,
    data: information
    }, useGlobalFilter);
  
  const { globalFilter } = state;
 
  return (
    <React.Fragment>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
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
      </React.Fragment>
  )
}

export default FilterTable