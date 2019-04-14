import React from 'react';

import { TableRow } from './TableRow';

import './BookTable.css';

export const TABLE_TYPES = {
  ASK: 'ask',
  BID: 'bid',
};

function PriceCell(props) {
  const styleClass = props.type === TABLE_TYPES.ASK
    ? 'askPriceCell'
    : 'bidPriceCell';

  return (
    <span className={styleClass}>
      {props.price}
    </span>
  );
}

export function BookTable(props) {
  return (
    <React.Fragment>
      {props.items.map((item, i) => {
        const { price, quantity } = item;
        const total = price * quantity;

        return (
          <TableRow
            customClass="dataRow"
            key={`item-${i}`}
            values={[
              <PriceCell price={price.toFixed(2)} type={props.type} />,
              quantity,
              total.toFixed(2)
            ]}
          />
        );
      })}
    </React.Fragment>
  );
}
