import { createSlice } from '@reduxjs/toolkit';
import { mockEmployees } from '../data/mockEmployees';

const initialState = {
  list: mockEmployees,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
    },
    setEmployees: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addEmployee, setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
