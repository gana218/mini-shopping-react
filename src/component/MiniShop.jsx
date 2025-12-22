import React, { useState, useMemo } from "react";
import "./MiniShop.css";
import products from "../../data/products";
import ProductList from "./ProductList";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import DonePage from "./DonePage";
import Home from "./Home";

function MiniShop() {
  const [step, setStep] = useState("products");
  const [cartItems, setCartItems] = useState([]);
  const [shipping, setShipping] = useState({ name: "", phone: "", address: "", memo: "" });
  const [agree, setAgree] = useState(false);
  const deliveryFee = 3000;

  const { selectedCount, selectedTotal } = useMemo(() => {
    const selected = cartItems.filter(i => i.checked);
    const count = selected.reduce((sum, i) => sum + i.qty, 0);
    const total = selected.reduce((sum, i) => sum + i.price * i.qty, 0);
    return { selectedCount: count, selectedTotal: total };
  }, [cartItems]);

const handleAddToCart = (productId) => {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  setCartItems((prev) => {
    const existingItem = prev.find((item) => item.id === product.id);

    if (existingItem) {
      // 이미 장바구니에 있으면 수량만 증가
      return prev.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      // 없으면 새 아이템 추가
      return [...prev, { ...product, qty: 1, checked: true }];
    }
  });
};


  const handleToggleItem = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const handleChangeQty = (id, delta) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };

  const handleDeleteItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleChangeShipping = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
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
    const selectedIds = cartItems.filter(i => i.checked).map(i => i.id);
    setCartItems(prev => prev.filter(i => !selectedIds.includes(i.id)));
    setStep("done");
  };

  const handleGoHome = () => {
    setStep("products");
    setAgree(false);
    setShipping({ name: "", phone: "", address: "", memo: "" });
  };

  return (
    <div className="shop-wrap">
        {step === "products" && (
            <Home onGoCart={() => setStep("cart")} />
        )}
        {step === "cart" && (
            <CartPage
                cartItems={cartItems}
                onToggle={handleToggleItem}
                onChangeQty={handleChangeQty}
                onDelete={handleDeleteItem}
                selectedCount={selectedCount}
                selectedTotal={selectedTotal}
                deliveryFee={deliveryFee}
                onGoCheckout={() => setStep("checkout")}
                onGoProducts={() => setStep("products")}
            />
        )}
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
        {step === "done" && <DonePage onGoHome={handleGoHome} />}
    </div>
  );
}

export default MiniShop;

