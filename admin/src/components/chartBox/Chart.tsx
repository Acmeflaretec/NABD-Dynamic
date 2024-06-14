import { ResponsiveContainer, LineChart, Line, Tooltip } from "recharts";

type Props = {
    chartData : object[],
    dataKey : string,
    color : string
}

const Chart = ({chartData , dataKey , color} : Props) => {
  

  return (
    <ResponsiveContainer width="99%" height="90%">
      <LineChart data={chartData}>
        <Tooltip 
            contentStyle={{ background: "transparent", border: "none", fontSize: "13px" }}
            labelStyle={{display:"none"}}
            position={{x: 60, y: -30}}
            />
            
        <Line dot={false} type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
