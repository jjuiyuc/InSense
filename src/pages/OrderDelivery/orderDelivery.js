import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectCartItems,
  selectCartTotal,
} from "../../Redux/cart/cartSelectors";

import MainContainer from "../../components/mainContainer";
import "./orderDelivery.scss";
import FormInput from "../../components/FormInput/FormInput";

import CheckoutItem from "../../components/CheckoutItem/checkoutItem";
// import FormInput from "../../components/FormInput/FormInput";

import "../Checkout/checkout.scss";
import SubmitButton from "../../components/SubmitButton/submitButton";

const OrderDelivery = ({ cartItems, total, handleChange, history }) => (
  <div className="checkout-page">
    <div className="title">購物車</div>
    <div className="checkout-header">
      <div className="header-block product-img">
        <span>商品</span>
      </div>
      <div className="header-block">
        <span>商品名稱</span>
      </div>
      <div className="header-block product-qty">
        <span>數量</span>
      </div>
      <div className="header-block">
        <span>價格</span>
      </div>
      <div className="header-block product-subtotal">
        <span>小計</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.itemId} cartItem={cartItem} />
    ))}

    {/* 優惠卷欄位 */}
    {/* <div className="coupon">
      <FormInput
        type="text"
        name="coupon"
        value="4EVER5566"
        handleChange={handleChange}
        label="折扣碼"
        required
      />
    </div>
    <div className="sum">${total}</div>
    <div className="discount">折扣: -100</div> */}
    <div className="total">總計: NT${total}</div>
    <SubmitButton
      inverted={true}
      onClick={() => {
        history.push("/orders/orderPayMent");
      }}
    >
      確認訂單
    </SubmitButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default withRouter(connect(mapStateToProps, null)(OrderDelivery));
