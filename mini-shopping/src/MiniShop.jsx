// MiniShop.jsx
import React, { useMemo, useState } from "react";
import "./MiniShop.css";
import ProductList from "./ProductList";

function MiniShop() {
  // 상품목록 페이지부터
  const [step, setStep] = useState("products");
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    address: "",
    memo: "",
  });
  const [agree, setAgree] = useState(false);

  const deliveryFee = 3000;

  const { selectedCount, selectedTotal } = useMemo(() => {
    const selected = cartItems.filter((item) => item.checked);
    const count = selected.reduce((sum, i) => sum + i.qty, 0);
    const total = selected.reduce((sum, i) => sum + i.price * i.qty, 0);
    return { selectedCount: count, selectedTotal: total };
  }, [cartItems]);

  // 상품목록에서 "장바구니 담기" 눌렀을 때
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        // 이미 있으면 수량 +1
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      // 없으면 새로 추가
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          checked: true,
        },
      ];
    });
  };

  const handleToggleItem = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleChangeQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleGoCheckout = () => {
    if (selectedCount === 0) {
      alert("최소 1개 이상 상품을 선택해주세요.");
      return;
    }
    setStep("checkout");
  };

  const handleChangeShipping = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = () => {
    if (!shipping.name || !shipping.phone || !shipping.address) {
      alert("배송지 정보를 모두 입력해주세요.");
      return;
    }
    if (!agree) {
      alert("상품 구매에 동의해주세요.");
      return;
    }
    const selectedIds = cartItems.filter((i) => i.checked).map((i) => i.id);
    setCartItems((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setStep("done");
  };

  const handleGoHome = () => {
    setStep("products");
    setAgree(false);
    setShipping({
      name: "",
      phone: "",
      address: "",
      memo: "",
    });
  };

  return (
    <div className="shop-wrap">
      <header className="shop-header">
        <h1 className="shop-title">Gdgoc Mini Shop</h1>
        <p className="breadcrumb">
          <span className={`step ${step === "products" ? "active" : ""}`}>
            01 상품선택
          </span>{" "}
          &gt;{" "}
          <span className={`step ${step === "cart" ? "active" : ""}`}>
            02 장바구니
          </span>{" "}
          &gt;{" "}
          <span className={`step ${step === "checkout" ? "active" : ""}`}>
            03 주문/결제
          </span>{" "}
          &gt;{" "}
          <span className={`step ${step === "done" ? "active" : ""}`}>
            04 주문확인
          </span>
        </p>
      </header>

      {/* 01 상품목록 페이지 */}
      {step === "products" && (
        <ProductList
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onGoCart={() => setStep("cart")}
        />
      )}

      {/* 02 장바구니 페이지 */}
      {step === "cart" && (
        <CartPage
          cartItems={cartItems}
          onToggle={handleToggleItem}
          onChangeQty={handleChangeQty}
          onDelete={handleDeleteItem}
          selectedCount={selectedCount}
          selectedTotal={selectedTotal}
          deliveryFee={deliveryFee}
          onGoCheckout={handleGoCheckout}
          onGoProducts={() => setStep("products")}
        />
      )}

      {/* 03 주문/결제 페이지 */}
      {step === "checkout" && (
        <CheckoutPage
          cartItems={cartItems}
          selectedTotal={selectedTotal}
          deliveryFee={deliveryFee}
          shipping={shipping}
          onChangeShipping={handleChangeShipping}
          agree={agree}
          setAgree={setAgree}
          onBack={() => setStep("cart")}
          onPay={handlePay}
        />
      )}

      {/* 04 주문완료 페이지 */}
      {step === "done" && <DonePage onGoHome={handleGoHome} />}
    </div>
  );
}

// ===== 장바구니 화면 =====
function CartPage({
  cartItems,
  onToggle,
  onChangeQty,
  onDelete,
  selectedCount,
  selectedTotal,
  deliveryFee,
  onGoCheckout,
  onGoProducts,
}) {
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
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <label className="cart-check">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onToggle(item.id)}
                  />
                </label>
                <div className="cart-thumb">사진</div>
                <div className="cart-info">
                  <div className="cart-name">{item.name}</div>
                  <div className="cart-price">
                    {item.price.toLocaleString()}원
                  </div>
                  <div className="cart-qty-row">
                    <div className="qty-control">
                      <button
                        type="button"
                        onClick={() => onChangeQty(item.id, -1)}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => onChangeQty(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(item.id)}
                >
                  삭제
                </button>
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
            <span>
              {(
                selectedTotal + (selectedCount > 0 ? deliveryFee : 0)
              ).toLocaleString()}
              원
            </span>
          </div>
          <button
            type="button"
            className="primary-btn full"
            disabled={selectedCount === 0}
            onClick={onGoCheckout}
          >
            총 {selectedCount}개 상품 구매하기
          </button>
        </aside>
      </div>
    </main>
  );
}

// ===== 주문/결제 화면 =====
function CheckoutPage({
  cartItems,
  selectedTotal,
  deliveryFee,
  shipping,
  onChangeShipping,
  agree,
  setAgree,
  onBack,
  onPay,
}) {
  const selected = cartItems.filter((i) => i.checked);
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
                <input
                  name="name"
                  placeholder="이름을 입력하세요"
                  value={shipping.name}
                  onChange={onChangeShipping}
                />
              </label>
              <label className="form-field">
                <span>전화번호</span>
                <input
                  name="phone"
                  placeholder="'-' 없이 입력"
                  value={shipping.phone}
                  onChange={onChangeShipping}
                />
              </label>
              <label className="form-field full">
                <span>주소</span>
                <input
                  name="address"
                  placeholder="주소를 입력하세요"
                  value={shipping.address}
                  onChange={onChangeShipping}
                />
              </label>
              <label className="form-field full">
                <span>배송메모</span>
                <select
                  name="memo"
                  value={shipping.memo}
                  onChange={onChangeShipping}
                >
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
            {selected.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-thumb">사진</div>
                <div className="order-info">
                  <div className="order-name">{item.name}</div>
                  <div className="order-meta">
                    {item.price.toLocaleString()}원 / {item.qty}개
                  </div>
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
            <p className="payment-desc">
              실제 결제 연동 없이, 카드 간편결제(일시불)로 처리되는
              것처럼만 동작하는 예시입니다.
            </p>
            <div className="payment-method">
              <label>
                <input type="radio" defaultChecked />
                카드 간편결제
              </label>
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
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
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

// ===== 주문완료 화면 =====
function DonePage({ onGoHome }) {
  return (
    <main className="page done-page">
      <div className="done-box">
        <div className="done-icon">✓</div>
        <h2 className="done-title">주문이 완료되었습니다.</h2>
        <p className="done-text">
          주문 내역은 마이페이지 &gt; 주문내역에서 확인하실 수 있습니다.
        </p>
        <button type="button" className="primary-btn" onClick={onGoHome}>
          계속 쇼핑하기
        </button>
      </div>
    </main>
  );
}

export default MiniShop;
