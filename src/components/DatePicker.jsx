import React from 'react';

/**
 * DatePicker React (format MM/DD/YYYY ou YYYY-MM-DD, sans timepicker)
 * Props :
 *   value (string), onChange (fn), name (string), id (string)
 *   min (string, optionnel), max (string, optionnel)
 *   className (string, optionnel), style (object, optionnel)
 *   ...props (autres props input)
 *
 * Le style par défaut est width: '100%', mais peut être surchargé par la prop style.
 * Toute classe CSS passée via className est appliquée à l'input.
 */
const defaultStyle = { width: '100%' };

export default function DatePicker({ value, onChange, name, id, min, max, className, style, ...props }) {
  // Convertit MM/DD/YYYY ou YYYY-MM-DD -> YYYY-MM-DD pour l'input
  function toInputValue(val) {
    if (!val) return '';
    if (val === 'today') {
      const today = new Date();
      return `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    }
    if (val.includes('/')) {
      const [mm, dd, yyyy] = val.split('/');
      if (!mm || !dd || !yyyy) return '';
      return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
    }
    // Si déjà au format YYYY-MM-DD
    return val;
  }
  // Convertit YYYY-MM-DD -> MM/DD/YYYY pour l'app
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
      min={toInputValue(min)}
      max={toInputValue(max)}
      className={className}
      style={{ ...defaultStyle, ...style }}
      {...props}
    />
  );
}

