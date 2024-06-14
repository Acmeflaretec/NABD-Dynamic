import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import "./detail.scss";

type Props = {
  id : number,
  title : string,
  img?: string,
  info : object,
  chart? : {
    dataKeys: {name : string , color : string}[],
    data? : object[],
  },
  activities? : {time : string , text : string}[],
}

const Detail = ({id , title , img , info , chart , activities} : Props) => {
  
  return (
    <div className="detail">
      <div className="view">
        <div className="info">
          <div className="mainInfo">
            {img && <img src={img} alt="" />}
            <h1>{title}</h1>
            <button>Update</button>
          </div>

          <div className="detailInfo">
            {Object.entries(info).map(item => (
              <div className="item" key={item[0]}>
              <span className="itemTitle">{item[0]} </span>
              <span className="itemValue">{item[1]}</span>
            </div>
            ))}
          </div>
        </div>

        

        {chart && <div className="chart">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chart?.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              {chart?.dataKeys.map(dataKey => (
                <Line
                type="monotone"
                dataKey={dataKey.name}
                stroke={dataKey.color}
              />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>}
      </div>

      <div className="activities">
        <h2 className="title">Latest Activities</h2>

        {activities && <ul>
          {activities.map(act => (
            <li key={id}>
            <div>
              <p>{act.text} </p>
              <span className="time">{act.time}</span>
            </div>
          </li>
          ))}
        </ul>}
      </div>
    </div>
  );
};

export default Detail;
