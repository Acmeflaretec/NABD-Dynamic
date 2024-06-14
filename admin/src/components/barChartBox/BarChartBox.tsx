import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import "./barChartBox.scss"

type Props = {
  title: string;
  color: string;
  dataKey: string;
  chartData: object[];
};

const BarChartBox = ({ title, color, dataKey, chartData }: Props) => {
  return (
    <div className="barChartBox">
      <h1>{title}</h1>
      <div className="chart">
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={chartData}>
              <Tooltip
                contentStyle={{ background: "#2a3447", borderRadius: "5px" }}
                labelStyle={{display : "none"}}
                cursor={{fill : "none"}}
              />
              <Bar dataKey={dataKey} fill={color} />
            </BarChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartBox;
