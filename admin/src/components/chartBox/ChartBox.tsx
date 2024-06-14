import "./chartBox.scss"
import { Link } from 'react-router-dom';
import Chart from './Chart';

type Props = {
    title : string,
    number : string | number,
    icon : string,
    chartData : object[],
    dataKey : string,
    color : string,
    percentage : number
}

const ChartBox = ({title , number , icon , chartData , dataKey , color , percentage } : Props) => {
    return (
        <div className="chartBox">
            <div className="box-info">
                <div className="title">
                    <img src={icon} alt="" />
                    <span>{title}</span>
                </div>
                <h1>{number}</h1>
                <Link to="/" style={{color: color}}>View all</Link>
            </div>

            <div className="chart-info">
                <div className="chart">
                    <Chart chartData={chartData} dataKey={dataKey} color={color}/>
                </div>

                <div className="texts">
                    <span className="percentage" style={{color : percentage > 0 ? "limegreen" : "tomato"}}>{percentage}%</span>
                    <span className="duration">this month</span>
                </div>
            </div>
        </div>
    );
};

export default ChartBox;