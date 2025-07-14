import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/employeesSlice';
import { Link } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';
import { states } from '../data/states';
import { validateEmployeeForm } from '../utils/employeeFormValidation';

const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

export default function CreateEmployee() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    department: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    let newValue = value;
    setForm(f => ({ ...f, [name]: newValue }));
  };


  const handleSubmit = e => {
    e.preventDefault();
    const newErrors = validateEmployeeForm(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    dispatch(addEmployee(form));
    setShowModal(true);
    setForm({
      firstName: '', lastName: '', dateOfBirth: '', startDate: '', street: '', city: '', state: '', zipCode: '', department: ''
    });
    setErrors({});
  };

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <nav style={{display:'flex',gap:24,justifyContent:'center',margin:'2rem 0'}}>
        <Link
          to="/employees"
          style={{
            background: '#1976d2',
            color: '#fff',
            padding: '0.5rem 1rem',
            borderRadius: 4,
            textDecoration: 'none',
            alignSelf: 'flex-start'
          }}
        >
          View Current Employees
        </Link>
      </nav>
      <div className="container">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name</label>
          <input
            name="firstName"
            id="first-name"
            value={form.firstName}
            onChange={handleChange}
            required
            onKeyDown={e => { if (/\d/.test(e.key)) e.preventDefault(); }}
          />
          {errors.firstName && <div style={{color: 'red', fontSize: 13}}>{errors.firstName}</div>}

          <label htmlFor="last-name">Last Name</label>
          <input
            name="lastName"
            id="last-name"
            value={form.lastName}
            onChange={handleChange}
            required
            onKeyDown={e => { if (/\d/.test(e.key)) e.preventDefault(); }}
          />
          {errors.lastName && <div style={{color: 'red', fontSize: 13}}>{errors.lastName}</div>}

          <label htmlFor="date-of-birth">Date of Birth</label>
          {/* Limite la date de naissance à aujourd'hui */}
          <DatePicker
            name="dateOfBirth"
            id="date-of-birth"
            value={form.dateOfBirth}
            onChange={val => setForm(f => ({ ...f, dateOfBirth: val }))}
            max="today"
          />
          {errors.dateOfBirth && <div style={{color: 'red', fontSize: 13}}>{errors.dateOfBirth}</div>}

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            name="startDate"
            id="start-date"
            value={form.startDate}
            onChange={val => setForm(f => ({ ...f, startDate: val }))}
          />
          {errors.startDate && <div style={{color: 'red', fontSize: 13}}>{errors.startDate}</div>}

          <div className="address">
            <label htmlFor="street">Street</label>
            <input name="street" id="street" value={form.street} onChange={handleChange} required />
            {errors.street && <div style={{color: 'red', fontSize: 13}}>{errors.street}</div>}

            <label htmlFor="city">City</label>
            <input name="city" id="city" value={form.city} onChange={handleChange} required onKeyDown={e => { if (/\d/.test(e.key)) e.preventDefault(); }} />
            {errors.city && <div style={{color: 'red', fontSize: 13}}>{errors.city}</div>}

            <Dropdown
              name="state"
              id="state"
              label="State"
              options={states.map(s => ({ value: s.abbreviation, label: s.name }))}
              value={form.state}
              onChange={val => setForm(f => ({ ...f, state: val }))}
            />
            {errors.state && <div style={{color: 'red', fontSize: 13}}>{errors.state}</div>}

            <label htmlFor="zip-code">Zip Code</label>
            <input name="zipCode" id="zip-code" value={form.zipCode} onChange={handleChange} required />
            {errors.zipCode && <div style={{color: 'red', fontSize: 13}}>{errors.zipCode}</div>}
          </div>

          <Dropdown
            name="department"
            id="department"
            label="Department"
            options={departments}
            value={form.department}
            onChange={val => setForm(f => ({ ...f, department: val }))}
          />
          {errors.department && <div style={{color: 'red', fontSize: 13}}>{errors.department}</div>}

          <button type="submit">Save</button>
        </form>
        {/* {showModal && <Modal onClose={() => setShowModal(false)}>Employee Created!</Modal>} */}
        <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)}>
          Employee Created!
        </Modal>
      </div>
    </>
  );
}
