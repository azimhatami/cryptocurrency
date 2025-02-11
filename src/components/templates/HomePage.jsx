import { useEffect, useState } from "react";
import { getCoinList } from "../../services/cryptoAPI";

import TableCoin from "../modules/TableCoin";

function HomePage() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(getCoinList());
      const json = await res.json();
      setCoins(json);
    };
    fetch(getCoinList())
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
