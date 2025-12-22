import "./Item.css";
import { products } from "../data/data";
import { useParams, useNavigate } from "react-router-dom";

const Item = () => {
    const { id } = useParams(); 
    const item = products.find((p) => p.id === parseInt(id));
    const navigate = useNavigate();

   return (
    <div className="total">
        <header className="header">
            <div className="header-left">
                <button className="back" onClick={() => navigate("/")}>◀</button>
                <h2 className="name">쇼핑몰 이름</h2>
            </div>

            <div className="header-icons">
                <button onClick={() => navigate("/")}>🏠</button>
                <button>🔔</button>
                <button>🛒</button>
            </div>
        </header>
        <div className="item">
            <div className="item-image">
                <img src={item.image} alt={item.name} />
            </div>
            <div className="item-top">
                <div className="brand">
                    <img src={item.brandLogo} alt={item.brand} />
                    <h3>{item.brand}</h3>
                </div>
                <p>❤ {item.like}</p>
            </div>
            <div className="item-middle-1">
                <p>카테고리 ▶ 카테고리</p>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
            </div>
            <div className="item-middle-2">
                <h3>리뷰 {item.reviews}개</h3>
                <p>전체보기</p>
            </div>
            <div className="menu">
                <span>상품정보</span>
                <span>리뷰</span>
                <span>사이즈</span>
                <span>문의</span>
            </div>
            <div className="item-detail">
                사진 주르르
            </div>       
        </div>
        <div className="footer">
            <p>❤ {item.like}</p>
            <button>구매하기</button>
        </div>
    </div>


   )

}

export default Item;