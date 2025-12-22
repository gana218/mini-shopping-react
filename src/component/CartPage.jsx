import React from "react";

function CartPage({ cartItems, onToggle, onChangeQty, onDelete, selectedCount, selectedTotal, deliveryFee, onGoCheckout, onGoProducts }) {
  return (
    <main className="page cart-page">
      <div className="cart-header-row">
        <h2 className="page-title">장바구니</h2>
        <button type="button" className="back-btn" onClick={onGoProducts}>
          &lt; 상품 더 보러가기
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-list">
          {cartItems.length === 0 ? (
            <p className="empty-text">장바구니에 담긴 상품이 없습니다.</p>
          ) : (
            cartItems.map(item => (
              <div className="cart-item" key={item.id}>
                <label className="cart-check">
                  <input type="checkbox" checked={item.checked} onChange={() => onToggle(item.id)} />
                </label>
                <div className="cart-thumb">사진</div>
                <div className="cart-info">
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-price">{item.price.toLocaleString()}원</div>
                  <div className="cart-qty-row">
                    <div className="qty-control">
                      <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
                <button type="button" className="delete-btn" onClick={() => onDelete(item.id)}>삭제</button>
              </div>
            ))
          )}
        </section>

        <aside className="summary">
          <h3 className="summary-title">주문 요약</h3>
          <div className="summary-row">
            <span>선택 상품금액</span>
            <span>{selectedTotal.toLocaleString()}원</span>
          </div>
          <div className="summary-row">
            <span>배송비</span>
            <span>{deliveryFee.toLocaleString()}원</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total-row">
            <span>총 결제금액</span>
            <span>{(selectedTotal + (selectedCount > 0 ? deliveryFee : 0)).toLocaleString()}원</span>
          </div>
          <button type="button" className="primary-btn full" disabled={selectedCount === 0} onClick={onGoCheckout}>
            총 {selectedCount}개 상품 구매하기
          </button>
        </aside>
      </div>
    </main>
  );
}

export default CartPage;
