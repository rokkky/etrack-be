export function filterTransactions(transactions, pageSize, pageIndex, period) {
  const currentDate = new Date();
  const result = {
    transactions: [],
    transactionsLength: 0,
  };

  if (transactions) {
    let periodStartDate;
    switch (period) {
      case 'month':
        periodStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        break;

      case '3month':
        periodStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate());
        break;

      case '6month':
        periodStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());
        break;

      case 'year':
        periodStartDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
        break;

      default:
        periodStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
        break;
    }
    transactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= periodStartDate && transactionDate <= currentDate;
    });
    result.transactionsLength = transactions.length;
    result.transactions = transactions.splice(pageIndex * pageSize, pageSize);
  }
  return result;
}
