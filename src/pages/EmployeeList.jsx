import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../components/DataTable';
import { Link } from 'react-router-dom';


export default function EmployeeList() {
  const employees = useSelector(state => state.employees.list);
  const columns = React.useMemo(() => [
    { accessorKey: 'firstName', header: 'First Name' },
    { accessorKey: 'lastName', header: 'Last Name' },
    { accessorKey: 'dateOfBirth', header: 'Date of Birth' },
    { accessorKey: 'startDate', header: 'Start Date' },
    { accessorKey: 'department', header: 'Department' },
    { accessorKey: 'street', header: 'Street' },
    { accessorKey: 'city', header: 'City' },
    { accessorKey: 'state', header: 'State' },
    { accessorKey: 'zipCode', header: 'Zip Code' },
  ], []);

  console.log('employees from redux:', employees);
  if (employees.length > 0) {
    console.log('structure premier employé:', employees[0]);
  }
  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
        <h2 style={{margin:0}}>Employee List</h2>
        <Link to="/" style={{background:'#1976d2',color:'#fff',padding:'0.5rem 1rem',borderRadius:4,textDecoration:'none'}}>← Back</Link>
      </div>
      <p style={{color:'#1976d2',fontWeight:500,marginBottom:8}}>{employees.length} employé(s) enregistré(s)</p>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
