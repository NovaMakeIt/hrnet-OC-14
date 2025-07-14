import React from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';

export default function DataTable({ columns, data }) {
  console.log('DataTable data prop:', data);

  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, pagination },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="datatable-root">
      <div className="datatable-header">
        <select
          value={pagination.pageSize}
          onChange={e => setPagination(p => ({ ...p, pageIndex: 0, pageSize: Number(e.target.value) }))}
          className="datatable-select"
        >
          {[10, 25, 50, 100].map(size => (
            <option key={size} value={size}>{size} entries</option>
          ))}
        </select>
        <input
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="datatable-search"
        />
      </div>
      <table className="datatable-table">
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className={`datatable-th ${header.column.getCanSort() ? 'datatable-th-sortable' : 'datatable-th-not-sortable'}`}
                onClick={header.column.getToggleSortingHandler()}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {header.column.getIsSorted() === 'asc' ? ' ▲' : header.column.getIsSorted() === 'desc' ? ' ▼' : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.length === 0 ? (
          <tr><td colSpan={columns.length} className="datatable-empty">No data</td></tr>
        ) : (
          table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="datatable-td">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
      <div className="datatable-pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="datatable-page-btn"
        >Précédent</button>
          <div className="datatable-pagination-group">
            <input
              type="number"
              min={1}
              max={table.getPageCount()}
              value={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                let val = Number(e.target.value);
                if (val < 1) val = 1;
                if (val > table.getPageCount()) val = table.getPageCount();
                table.setPageIndex(val - 1);
              }}
              className="datatable-page-input"
            />
            <span className="datatable-page-count">/ {table.getPageCount()}</span>
          </div>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="datatable-page-btn"
        >Suivant</button>
      </div>
    </div>
  );
}
