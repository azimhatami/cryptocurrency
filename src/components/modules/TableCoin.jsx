import { marketChart } from "../../services/cryptoAPI";
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

import { ThreeDots } from "react-loader-spinner";

function TableCoin({ coins, isLoading, setChart }) {
  // console.log(coins);
  return (
    <div className="flex items-center justify-center h-full !mt-[4rem]">
      {isLoading ? (
        <div className="h-[30rem]">
          <ThreeDots color="#76ABAE" />
        </div>
      ) : (
        <table className="w-[55rem] border-collapse place-self-center">
          <thead className="border-b border-[#76ABAE]/70 h-10">
            <tr className="*:text-start">
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h</th>
              <th>Total Volume</th>
            </tr>
          </thead>
          <tbody className="*:border-b-[1px] *:border-[#76ABAE]/20">
            {coins.map((coin) => {
              return (
                <TableRow coin={coin} key={coin.id} setChart={setChart} />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({
  coin: {
    id,
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h: price_change,
  },
  setChart,
}) => {
  const showHandler = async () => {
    try {
      const response = await fetch(marketChart(id));
      const json = await response.json();
      // console.log("in", json);
      setChart(json);
    } catch (error) {
      setChart(error);
    }
  };

  return (
    <tr className="*:h-12 first:!mt-4 *:font-medium">
      <td className="">
        <div className="flex items-center gap-x-3" onClick={showHandler}>
          <img src={image} alt={name} className="w-6 h-6" />
          <span className="font-semibold text-[#76ABAE]/50 cursor-pointer">
            {symbol.toUpperCase()}
          </span>
        </div>
      </td>
      <td>{name}</td>
      <td>{current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? "text-green-400" : "text-red-400"}>
        {price_change.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img src={price_change > 0 ? chartUp : chartDown} alt={name} />
      </td>
    </tr>
  );
};
