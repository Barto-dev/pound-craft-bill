import type { LineItemType, InvoiceType } from '../../types/DTM';

// Transforms pennies to pounds, since we receive all amounts in pennies
export const penniesToPounds = (coins: number | null) => {
  if (!coins) {
    return 0;
  }
  return coins / 100;
};

export const poundsToPennies = (pounds: number) => {
  return pounds * 100;
};

// Takes all the line items and adds them up
export const sumLineItems = (lineItems: LineItemType[] | undefined): number => {
  if (!lineItems) {
    return 0;
  }
  const amountInCoins = lineItems.reduce((prevValue, currenItem) => {
    if (!currenItem.amount) {
      return prevValue;
    }
    return prevValue + currenItem.amount;
  }, 0);
  return penniesToPounds(amountInCoins);
};

// Takes and returns a pound amount (GBP), formatted in the format that common in the UK
export const formatToPoundCurrency = (amount: number) => {
  return amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
};

/**
 * Parses a currency amount string and returns the numeric value.
 * Removes non-numeric characters, such as letters or symbols, from the input.
 */
export const convertToNumericCurrency = (amount: string) => {
  const amountWithoutLetters = amount.replace(/[^0-9.-]+/g, '');
  return parseFloat(amountWithoutLetters);
};

// Takes all the invoices and finds the total
export const sumInvoices = (invoices: InvoiceType[] | undefined): number => {
  if (!invoices) {
    return 0;
  }
  return invoices.reduce((prevValue, invoice) => {
    const invoiceSum = sumLineItems(invoice.lineItems);
    return prevValue + invoiceSum;
  }, 0);
};

// discount and determines the invoice total
export const invoiceTotal = (
  lineItems: LineItemType[] | undefined,
  discount: number | undefined
): number => {
  const invoiceSum = sumLineItems(lineItems);
  if (discount) {
    const invoiceDiscount = invoiceSum * (discount / 100);
    return invoiceSum - invoiceDiscount;
  }
  return invoiceSum;
};
