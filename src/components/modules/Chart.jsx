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
  // console.log(convertData(chart, type));
  return (
    <div className="bg-gray-600/10 backdrop-blur-sm fixed top-0 left-0 w-full h-screen z-50 flex items-start justify-center">
      <span
        className="bg-red-400/55 hover:bg-red-400/60 w-8 h-8 !p-2 rounded-md text-xl font-semibold cursor-pointer flex items-center justify-center !mt-12"
        onClick={() => setChart(null)}
      >
        X
      </span>
      <div className="bg-[#31363F] w-[50rem] h-[30rem] !mt-25 rounded-lg shadow-lg shadow-gray-400/50">
        <div className="w-[45rem] h-[20rem]">
          <ChartComponent data={convertData(chart, type)} type={type} />
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
