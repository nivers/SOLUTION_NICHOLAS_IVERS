import React from 'react';

import { BookTable, TABLE_TYPES } from './BookTable';
import { fetchBook } from './fetchBook';
import { TableRow } from './TableRow';

import './App.css';

const FIVE_SECONDS = 5000;

function App() {
  const [priceData, setPriceData] = React.useState(null);

  // fetch updated book on initialy render, then once every 5 seconds after the prior fetch is completed
  React.useEffect(() => {
    const updateBook = () => {
      fetchBook()
        .then(setPriceData)
        .finally(() => {
          setTimeout(updateBook, FIVE_SECONDS);
        });
      };
    updateBook();
  }, []);

  // TODO, better loading handling
  if (!priceData) {
    return (
      <div>
        {'Loading . . .'}
      </div>
    );
  }

  const { asks, bids } = priceData || {};
  const sixLowestAsks = asks
    .sort((a, b) => a.price < b.price ? -1 : 1)
    .slice(0, 6)
    .reverse();
  const sixHighestBids = bids
    .sort((a, b) => a.price < b.price ? 1 : -1)
    .slice(0, 6);

  // mean of lowest ask and highest bid
  const lowestAskPrice = sixLowestAsks[sixLowestAsks.length - 1].price;
  const highestBidPrice = sixHighestBids[0].price;
  const askBidAverage = (lowestAskPrice + highestBidPrice) / 2;

  return (
    <div className="container">
      <div className="header">
        <div className="sectionContainer">
          {'order book'}
        </div>
      </div>
      <div className="sectionContainer">
        <TableRow customClass="tableHeader" values={[
          'Price (USDT)',
          'Amount (BTC)',
          'Total'
        ]}>
        </TableRow>
        <BookTable items={sixLowestAsks} type={TABLE_TYPES.ASK} />
        <div className="askBidAverage">
          {`$${askBidAverage}`}
        </div>
        <BookTable items={sixHighestBids} type={TABLE_TYPES.BID} />
      </div>
    </div>
  );
}

export default App;
