import Detail from "../../components/detail/Detail";
import "./userDetail.scss";
import { singleUser } from './../../data';

const UserDetail = () => {
    return (
        <div className="userDetail">
            <Detail {...singleUser}/>
        </div>
    );
};

export default UserDetail;