export const formatNumber = (num) => {
  if (!num) return "";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const calcTotalEXW = (qty, exw) => {
  return qty * exw;
};

export const calcSellAmount = (qty, sell) => {
  if (!sell) return 0;
  return qty * sell;
};

export const calcProfit = (qty, exw, sell, logistics) => {
  const totalEXW = qty * exw;
  const sellAmount = sell ? qty * sell : 0;
  return sellAmount - totalEXW - logistics;
};
