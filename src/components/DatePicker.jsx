import React from 'react';

/**
 * DatePicker React (format MM/DD/YYYY, sans timepicker)
 * Props : value (string), onChange (fn), name (string), id (string)
 */
export default function DatePicker({ value, onChange, name, id }) {
  // Convertit le format MM/DD/YYYY <-> YYYY-MM-DD pour l'input type="date"
  function toInputValue(val) {
    if (!val) return '';
    const [mm, dd, yyyy] = val.split('/');
    if (!mm || !dd || !yyyy) return '';
    return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
  }
  function fromInputValue(val) {
    if (!val) return '';
    const [yyyy, mm, dd] = val.split('-');
    if (!yyyy || !mm || !dd) return '';
    return `${mm}/${dd}/${yyyy}`;
  }

  return (
    <input
      type="date"
      name={name}
      id={id}
      value={toInputValue(value)}
      onChange={e => onChange(fromInputValue(e.target.value))}
      pattern="\d{4}-\d{2}-\d{2}"
      style={{width:'100%'}}
    />
  );
}
