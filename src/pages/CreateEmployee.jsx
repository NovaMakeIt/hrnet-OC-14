import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../store/employeesSlice';
import { Link } from 'react-router-dom';
import DatePicker from '../components/DatePicker';
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';

const departments = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];
const states = [
  { name: 'Alabama', abbreviation: 'AL' },
  { name: 'Alaska', abbreviation: 'AK' },
  // ... à compléter avec toutes les US states
];

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

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(addEmployee(form));
    setShowModal(true);
    setForm({
      firstName: '', lastName: '', dateOfBirth: '', startDate: '', street: '', city: '', state: '', zipCode: '', department: ''
    });
  };

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <nav style={{display:'flex',gap:24,justifyContent:'center',margin:'2rem 0'}}>
          <Link to="/employees">Employee List</Link>
      </nav>
      <div className="container">
        <h2>Create Employee</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="first-name">First Name</label>
          <input name="firstName" id="first-name" value={form.firstName} onChange={handleChange} />

          <label htmlFor="last-name">Last Name</label>
          <input name="lastName" id="last-name" value={form.lastName} onChange={handleChange} />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            name="dateOfBirth"
            id="date-of-birth"
            value={form.dateOfBirth}
            onChange={val => setForm(f => ({ ...f, dateOfBirth: val }))}
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            name="startDate"
            id="start-date"
            value={form.startDate}
            onChange={val => setForm(f => ({ ...f, startDate: val }))}
          />

          <div className="address">
            <label htmlFor="street">Street</label>
            <input name="street" id="street" value={form.street} onChange={handleChange} />

            <label htmlFor="city">City</label>
            <input name="city" id="city" value={form.city} onChange={handleChange} />

            <Dropdown
              name="state"
              id="state"
              label="State"
              options={states.map(s => ({ value: s.abbreviation, label: s.name }))}
              value={form.state}
              onChange={val => setForm(f => ({ ...f, state: val }))}
            />

            <label htmlFor="zip-code">Zip Code</label>
            <input name="zipCode" id="zip-code" value={form.zipCode} onChange={handleChange} />
          </div>

          <Dropdown
            name="department"
            id="department"
            label="Department"
            options={departments}
            value={form.department}
            onChange={val => setForm(f => ({ ...f, department: val }))}
          />

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
