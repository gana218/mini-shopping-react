import React from "react";

function ProductList({ products, onAddToCart, onGoCart }) {
  return (
    <main className="page products-page">
      <h2>상품 목록</h2>
      <button onClick={onGoCart}>장바구니로 이동</button>
      <div className="product-grid">
        {products.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} className="product-thumb" />
            <h3>{item.name}</h3>
            <p>{item.brand}</p>
            <p>₩{item.price.toLocaleString()}</p>
            <p>❤ {item.likes}</p>
            <button onClick={() => onAddToCart(item.id)}>장바구니 담기</button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default ProductList;
