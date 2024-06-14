import Detail from "../../components/detail/Detail";
import "./productDetail.scss";
import { singleProduct } from './../../data';

const ProductDetail = () => {
    return (
        <div className="productDetail">
            <Detail {...singleProduct}/>
        </div>
    );
};

export default ProductDetail;
