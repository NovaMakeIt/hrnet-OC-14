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
    <div className="container employee-list-maxwidth1000">
      <Link to="/" className="employee-list-back">← Back</Link>
      <div className="employee-list-headerflex">
        <h2 className="employee-list-title">Current Employees</h2>
      </div>
      <p className="employee-list-count">{employees.length} employé(s) enregistré(s)</p>
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
