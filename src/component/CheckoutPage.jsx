import React from "react";

function CheckoutPage({ cartItems, selectedTotal, deliveryFee, shipping, onChangeShipping, agree, setAgree, onBack, onPay }) {
  const selected = cartItems.filter(i => i.checked);
  const finalTotal = selectedTotal + deliveryFee;

  return (
    <main className="page checkout-page">
      <button className="back-btn" type="button" onClick={onBack}>
        &lt; 장바구니로 돌아가기
      </button>
      <h2 className="page-title">주문 / 결제</h2>

      <div className="checkout-layout">
        <section className="checkout-main">
          <section className="box">
            <h3 className="box-title">배송지 정보</h3>
            <div className="form-grid">
              <label className="form-field">
                <span>받는 분</span>
                <input name="name" placeholder="이름을 입력하세요" value={shipping.name} onChange={onChangeShipping} />
              </label>
              <label className="form-field">
                <span>전화번호</span>
                <input name="phone" placeholder="'-' 없이 입력" value={shipping.phone} onChange={onChangeShipping} />
              </label>
              <label className="form-field full">
                <span>주소</span>
                <input name="address" placeholder="주소를 입력하세요" value={shipping.address} onChange={onChangeShipping} />
              </label>
              <label className="form-field full">
                <span>배송메모</span>
                <select name="memo" value={shipping.memo} onChange={onChangeShipping}>
                  <option value="">배송메모를 선택해주세요</option>
                  <option value="door">문 앞에 놓아주세요</option>
                  <option value="call">도착 전에 연락주세요</option>
                  <option value="security">경비실에 맡겨주세요</option>
                </select>
              </label>
            </div>
          </section>

          <section className="box">
            <h3 className="box-title">주문상품</h3>
            {selected.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-thumb">사진</div>
                <div className="order-info">
                  <div className="order-name">{item.name}</div>
                  <div className="order-meta">{item.price.toLocaleString()}원 / {item.qty}개</div>
                </div>
              </div>
            ))}
            <div className="order-sum-row">
              <span>총 상품금액</span>
              <span>{selectedTotal.toLocaleString()}원</span>
            </div>
          </section>

          <section className="box">
            <h3 className="box-title">결제수단</h3>
            <p className="payment-desc">실제 결제 연동 없이 카드 간편결제처럼 처리되는 예시입니다.</p>
            <div className="payment-method">
              <label><input type="radio" defaultChecked /> 카드 간편결제</label>
            </div>
          </section>
        </section>

        <aside className="summary checkout-summary">
          <h3 className="summary-title">결제 금액</h3>
          <div className="summary-row">
            <span>상품금액</span>
            <span>{selectedTotal.toLocaleString()}원</span>
          </div>
          <div className="summary-row">
            <span>배송비</span>
            <span>{deliveryFee.toLocaleString()}원</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row total-row">
            <span>최종 결제금액</span>
            <span>{finalTotal.toLocaleString()}원</span>
          </div>

          <label className="agree-row">
            <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} />
            <span>상품 구매 조건 및 결제에 동의합니다.</span>
          </label>

          <button type="button" className="primary-btn full" onClick={onPay}>
            {finalTotal.toLocaleString()}원 결제하기
          </button>
        </aside>
      </div>
    </main>
  );
}

export default CheckoutPage;
