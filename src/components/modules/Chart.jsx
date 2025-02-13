import { convertData } from "../../helpers/convertData";
import { useState } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
} from "recharts";

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  console.log(chart);
  console.log("out", type);

  const typeHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const type = event.target.innerText.toLowerCase().replace(" ", "_");
      console.log("in", type);
      setType(type);
    }
  };

  return (
    <div className="bg-gray-600/10 backdrop-blur-sm fixed top-0 left-0 w-full h-screen z-50 flex items-start justify-center">
      <span
        className="bg-red-400/55 hover:bg-red-400/60 w-8 h-8 !p-2 rounded-md text-xl font-semibold cursor-pointer flex items-center justify-center !mt-12"
        onClick={() => setChart(null)}
      >
        X
      </span>
      <div className="bg-[#222831] w-[50rem] h-[30rem] !mt-25 rounded-lg shadow-lg shadow-gray-400/50 flex flex-col items-center gap-y-5 !px-6 !pt-2">
        <div className="flex items-center gap-x-4 self-start">
          <img src={chart.coin.image} className="w-12 h-12" />
          <p className="text-xl font-semibold">{chart.coin.name}</p>
        </div>
        <div className="w-[100%] h-[18rem]">
          <ChartComponent data={convertData(chart, type)} type={type} />
        </div>
        <div className="flex justify-between w-full" onClick={typeHandler}>
          <button
            className={`${type === "prices" ? "selected" : null} border border-1 border-[#76ABAE] hover:bg-[#76ABAE]/50 rounded-md w-[8rem] font-semibold`}
          >
            Prices
          </button>
          <button
            className={`${type === "market_caps" ? "selected" : null} border border-1 border-[#76ABAE] hover:bg-[#76ABAE]/50 rounded-md w-[8rem] font-semibold`}
          >
            Market caps
          </button>
          <button
            className={`${type === "total_volumes" ? "selected" : null} border border-1 border-[#76ABAE] hover:bg-[#76ABAE]/50 rounded-md w-[8rem] font-semibold`}
          >
            Total Volumes
          </button>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-3">
            <p className="text-[#76ABAE]/80 font-bold text-lg">Prices:</p>
            <span className="font-semibold">{chart.coin.current_price}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <p className="text-[#76ABAE]/80 font-bold text-lg">ATH:</p>
            <span className="font-semibold">{chart.coin.ath}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <p className="text-[#76ABAE]/80 font-bold text-lg">Market Cap:</p>
            <span className="font-semibold">{chart.coin.market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#3874ff"
          strokeWidth="2px"
        />
        <CartesianGrid stroke="#404042" />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <XAxis dataKey="date" hide />
        <Legend />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
