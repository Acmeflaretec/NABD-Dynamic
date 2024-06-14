import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import "./pieChartBox.scss";

const PieChartBox = () => {
  const data = [
    { name: "Mobile", value: 400, color: "#0088fe" },
    { name: "Desktop", value: 300, color: "#00c49f" },
    { name: "Laptop", value: 300, color: "#ffbb28" },
    { name: "Tablet", value: 200, color: "#ff8042" },
  ];

  return (
    <div className="pieChartBox">
        <h1>Leads by Source</h1>
      <div className="chart">
          <ResponsiveContainer width="99%" height={300}>
            <PieChart>
                <Tooltip
                    contentStyle={{background : "white" , borderRadius : "5px"}}
                />
              <Pie
                data={data}
                innerRadius={"65%"}
                outerRadius={"85%"}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
      </div>

      <div className="options">
        {data.map((option) => (
            <div className="option" key={option.name}>
                <div className="title">
                    <div className="dot" style={{background : option.color}}/>
                    <span>{option.name}</span>
                </div>

                <span className="value">{option.value}</span>
            </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartBox;
