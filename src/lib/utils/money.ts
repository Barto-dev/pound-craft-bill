import type { LineItem } from '../../global';

export const sumLineItems = (lineItems: LineItem[] | undefined): number => {
  if (!lineItems) {
    return 0;
  }
  const amountInCoins = lineItems.reduce((prevValue, currenItem) => {
    return prevValue + currenItem.amount;
  }, 0);
  return coinsToPounds(amountInCoins);
};

export const formatToPoundCurrency = (amount: number) => {
  return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
};

export const coinsToPounds = (coins: number) => {
  return coins / 100;
};
