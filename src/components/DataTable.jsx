import React from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

export default function DataTable({ columns, data }) {
  console.log('DataTable data prop:', data);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{width:'100%',borderCollapse:'collapse',background:'#fff'}}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} style={{borderBottom:'2px solid #1976d2',padding:'0.5rem',textAlign:'left'}}>
                {flexRender(header.column.columnDef.header, header.getContext())}
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
  );
}
