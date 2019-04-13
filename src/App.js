import React from 'react';
import lodashGet from 'lodash.get';

import { fetchBook } from './fetchBook';

import './App.css';

const FIVE_SECONDS = 5000;

function App() {
  const [priceData, setPriceData] = React.useState(null);

  React.useEffect(() => {
    const now = Date.now();
    const lastFetchTimestamp = lodashGet(priceData, 'timeStamp') || null;
    const updateBook = () => {
      fetchBook().then(data => setPriceData({
        ...data,
        timeStamp: Date.now(),
      }));
    };

    if (lastFetchTimestamp && now - lastFetchTimestamp < FIVE_SECONDS) {
      setTimeout(updateBook, FIVE_SECONDS);
    } else {
      updateBook();
    }
  }, [priceData]); 

  console.log(priceData);

  return (
    <div>
      Book
    </div>
  );
}

export default App;
