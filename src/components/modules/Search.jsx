import { useState, useEffect } from "react";
import { searchCoin } from "../../services/cryptoAPI";
import { ThreeDots } from "react-loader-spinner";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    setCoins([]);

    if (!text) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        const response = await fetch(searchCoin(text), {
          signal: controller.signal,
        });
        const json = await response.json();
        console.log(json.coins);
        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error_message);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };

    setIsLoading(true);
    search();

    return () => controller.abort();
  }, [text]);

  return (
    <div className="flex items-center justify-end w-[85%] !mt-4">
      <input
        type="text"
        className="w-[20rem] h-[2.2rem] !mr-3 bg-[#31363F] text-[#eeeeee] !px-2 rounded-md outline-none font-medium border border-1 border-[#76ABAE]/60"
        placeholder="Search ..."
        vlue={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select
        className="bg-[#31363F] w-[4rem] h-[2.2rem] rounded-md border-1 border-[#76ABAE]/60 outline-none"
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option vlaue="usd">USD</option>
        <option vlaue="eur">EUR</option>
        <option vlaue="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading) && (
        <div className="w-[20rem] h-[18rem] bg-[#31363F] !mt-3 absolute overflow-y-auto !p-2 rounded-md [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-400 [&::-webkit-scrollbar-track]:rounded-md [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-md top-14 right-[22rem]">
          {isLoading && (
            <ThreeDots
              color="#76ABAE"
              width="50px"
              height="50px"
              wrapperStyle={{
                display: "flex",
                justifyContent: "center",
                marginTop: "4rem",
              }}
            />
          )}
          <ul className="flex flex-col gap-y-1">
            {coins.map((coin) => {
              return (
                <li className="flex items-center gap-x-4 bg-[#222831] hover:bg-[#222831]/50 h-[2.5rem] rounded-md !px-1">
                  <img src={coin.thumb} alt={coin.name} />
                  <p className="font-semibold">{coin.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
