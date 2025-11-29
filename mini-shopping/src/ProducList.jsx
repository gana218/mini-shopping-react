// ProductList.jsx
import React from "react";
import "./MiniShop.css";

const PRODUCTS = [
  { id: 1, name: "강아지 간식 세트", price: 12000, desc: "댕댕이를 위한 간식 모음" },
  { id: 2, name: "고양이 장난감", price: 9000, desc: "냥이 전용 캣토이 세트" },
  { id: 3, name: "기니피그 사료", price: 15000, desc: "기니피그 맞춤 영양 사료" },
  { id: 4, name: "토끼 건초 세트", price: 11000, desc: "향 좋은 티모시 건초" },
];

function ProductList({ cartItems, onAddToCart, onGoCart }) {
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="page product-page">
      <div className="product-top-row">
        <h2 className="page-title">상품목록</h2>
        <button type="button" className="primary-btn" onClick={onGoCart}>
          장바구니 가기 ({cartCount})
        </button>
      </div>

      <p className="product-sub">
        반려동물을 위한 미니 쇼핑몰입니다. 상품을 선택해 장바구니에 담아보세요 🐶🐱
      </p>

      <div className="product-grid">
        {PRODUCTS.map((p) => (
          <div className="product-card" key={p.id}>
            <div className="product-thumb">사진</div>
            <div className="product-info">
              <div className="product-name">{p.name}</div>
              <div className="product-desc">{p.desc}</div>
              <div className="product-bottom-row">
                <span className="product-price">
                  {p.price.toLocaleString()}원
                </span>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => onAddToCart(p)}
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProductList;
