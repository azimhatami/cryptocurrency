import { useState, useEffect } from "react";
import { searchCoin } from "../../services/cryptoAPI";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    if (!text) return;

    const search = async () => {
      try {
        const response = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await response.json();
        console.log(json.coins);
        if (json.coins) {
          setCoins(json.coins);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    search();

    return () => controller.abort();
  }, [text]);

  return (
    <>
      <input
        type="text"
        className="bg-gray-400"
        vlue={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option vlaue="usd">USD</option>
        <option vlaue="eur">EUR</option>
        <option vlaue="jpy">JPY</option>
      </select>
    </>
  );
}

export default Search;
