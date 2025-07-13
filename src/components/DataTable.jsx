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
    <div style={{width:'100%'}}>
      <div style={{marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <select
          value={pagination.pageSize}
          onChange={e => setPagination(p => ({ ...p, pageIndex: 0, pageSize: Number(e.target.value) }))}
          style={{padding:'0.5rem',width:'200px',border:'1px solid #ccc',borderRadius:4}}
        >
          {[10, 25, 50, 100].map(size => (
            <option key={size} value={size}>{size} entries</option>
          ))}
        </select>
        <input
          value={globalFilter}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          style={{padding:'0.5rem',width:'200px',border:'1px solid #ccc',borderRadius:4}}
        />
      </div>
      <table style={{width:'100%',borderCollapse:'collapse',background:'#fff'}}>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                style={{borderBottom:'2px solid #1976d2',padding:'0.5rem',textAlign:'left',cursor:header.column.getCanSort()?'pointer':'default',userSelect:'none'}}
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
          <tr><td colSpan={columns.length} style={{textAlign:'center',padding:'1.5rem',color:'#888'}}>No data</td></tr>
        ) : (
          table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} style={{borderBottom:'1px solid #eee',padding:'0.5rem'}}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:12,marginTop:16}}>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          style={{
            padding:'0.5rem 1.2rem',
            borderRadius:6,
            border:'none',
            maxWidth:200,
            background:!table.getCanPreviousPage() ? '#e0e0e0' : '#1976d2',
            color:!table.getCanPreviousPage() ? '#888' : '#fff',
            fontWeight:'bold',
            fontSize:'1rem',
            cursor:table.getCanPreviousPage()?'pointer':'not-allowed',
            transition:'background 0.2s'
          }}
        >Précédent</button>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
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
          style={{width:50,padding:'0.4rem',border:'1px solid #1976d2',borderRadius:6,textAlign:'center',fontWeight:'bold'}}
        />
        <span style={{margin:'0 8px',fontWeight:500}}>/ {table.getPageCount()}</span>
        </div>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          style={{
            padding:'0.5rem 1.2rem',
            borderRadius:6,
            border:'none',
            maxWidth:200,
            background:!table.getCanNextPage() ? '#e0e0e0' : '#1976d2',
            color:!table.getCanNextPage() ? '#888' : '#fff',
            fontWeight:'bold',
            fontSize:'1rem',
            cursor:table.getCanNextPage()?'pointer':'not-allowed',
            transition:'background 0.2s'
          }}
        >Suivant</button>
      </div>
    </div>
  );
}
