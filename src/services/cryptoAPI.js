const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = "CG-X6ZG7CJnY2Zw73yUMZTatAex";

function getCoinList(page, currency) {
  return `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${page}&x_cg_demo_api_key=${API_KEY}`;
}

function searchCoin(query) {
  return `${BASE_URL}/search?query=${query}&x_cg_demo_api_key=${API_KEY}`;
}

export { getCoinList, searchCoin };
