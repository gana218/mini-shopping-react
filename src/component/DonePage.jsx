import React from "react";

function DonePage({ onGoHome }) {
  return (
    <main className="page done-page">
      <div className="done-box">
        <div className="done-icon">✓</div>
        <h2 className="done-title">주문이 완료되었습니다.</h2>
        <p className="done-text">주문 내역은 마이페이지 &gt; 주문내역에서 확인하실 수 있습니다.</p>
        <button type="button" className="primary-btn" onClick={onGoHome}>계속 쇼핑하기</button>
      </div>
    </main>
  );
}

export default DonePage;
