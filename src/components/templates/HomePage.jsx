import { useEffect, useState } from "react";
import TableCoin from "../modules/TableCoin";

function HomePage() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&x_cg_demo_api_key=CG-X6ZG7CJnY2Zw73yUMZTatAex"
    )
      .then((response) => response.json())
      .then((json) => setCoins(json));
  }, []);

  return (
    <>
      <TableCoin coins={coins} />
    </>
  );
}

export default HomePage;
