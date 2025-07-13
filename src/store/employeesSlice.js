import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
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
