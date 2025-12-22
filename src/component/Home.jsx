import "./Home.css";
import { products } from "../data/data";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
   return (
    <div className="total">
        <header className="header">
            <div>
                <h2>쇼핑몰 이름</h2>
            </div>
            <div>
                🔔
                <button>🛒</button>
            </div>
        </header>
        <input 
            className="search"
            type="text"
            placeholder="검색어를 입력하세요🔍"
        />
        <div className="categories">
            <span>추천</span>
            <span>쇼핑몰</span>
            <span>브랜드</span>
            <span>뷰티</span>
            <span>라이프</span>
            <span>디지털</span>
            <span>랭킹</span>
        </div>

        <img src="/banner.png" alt="블랙프라이데이 배너" className="banner"/>

        <div>
            <div className="recommend">
                <h3>내 취향 맞춤 추천 아이템</h3>
                <p className="more">더보기</p>
            </div>
            <div className="product-list">
                {products.map((item) => (
                    <div key={item.id} className="product-card" onClick={() => navigate(`/item/${item.id}`)} style={{ cursor: "pointer" }}>
                        <div className="product-img">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="product-info">
                            <p className="brand">{item.brand}</p>
                            <p className="name">{item.name}</p>
                            <p className="price">{item.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <footer className="home-button">
            <span>카테고리</span>
            <span>스냅</span>
            <span>홈</span>
            <span>좋아요</span>
            <span>마이</span>
        </footer>
    </div>


   )

}

export default Home;