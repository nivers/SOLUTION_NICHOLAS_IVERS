const BOOK_URL =  'https://exchange.itbit.com/api/feeds/orderbook/XBTUSD';

export function fetchBook() {
  return fetch(BOOK_URL)
    .then(response => response.json())
}
