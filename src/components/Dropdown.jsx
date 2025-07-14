import React from 'react';
import Select from 'react-select';

/**
 * Dropdown React basé sur react-select
 * Props :
 *   - options : array (string[] ou { value, label }[])
 *   - value : string
 *   - onChange : function
 *   - name : string
 *   - id : string
 *   - label : string (optionnel)
 */
export default function Dropdown({ options, value, onChange, name, id, label, menuListMaxHeight }) {
  // Normalise options (string[] ou [{ value, label }])
  const normalized = options.map(opt =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );
  // Trouve l'option sélectionnée
  const selected = normalized.find(opt => opt.value === value) || null;

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <Select
        inputId={id}
        name={name}
        options={normalized}
        value={selected}
        onChange={option => onChange(option ? option.value : '')}
        isClearable
        placeholder="-- Select --"
        styles={menuListMaxHeight ? {
          menuList: (provided) => ({
            ...provided,
            maxHeight: menuListMaxHeight,
            overflowY: 'auto',
          }),
          container: base => ({ ...base, width: '100%' }),
          menu: base => ({ ...base, zIndex: 9999 }),
        } : {
          container: base => ({ ...base, width: '100%' }),
          menu: base => ({ ...base, zIndex: 9999 }),
        }}
      />
    </div>
  );
}
