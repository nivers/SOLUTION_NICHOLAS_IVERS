import React from 'react';

import './TableRow.css';

export function TableRow(props) {
  return (
    <div className={`tableRow ${props.customClass}`}>
      {props.values.map((value, i) => (
        <div className="tableCell" key={`cell-${i}`}>
          {value}
        </div>
      ))}
    </div>
  );
}
