import { topDealUsers } from "../../data";
import "./topBox.scss";

const TopBox = () => {
  return (
    <div className="topBox">
      <h2>Top Deals</h2>

      <div className="list">
        {topDealUsers.map((user) => (
          <div className="listItem" key={user.id}>
            <div className="user">
              <img src={user.img} alt="" />
              <div className="texts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>

            <div className="amount">{user.amount}$</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;
