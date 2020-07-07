import React,{useState, useEffect} from "react";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectUserLogin,
} from "../../Redux/cart/cartSelectors";

import { userToggleFunc } from "../../Redux/nav/navAction";
import { bindActionCreators } from "redux";
import { toggleCartHidden } from "../../Redux/cart/cartAction";

import CheckoutItem from "../../components/CheckoutItem/checkoutItem";

import "./checkout.scss";
import SubmitButton from "../../components/SubmitButton/submitButton";

const CheckoutPage = ({
  cartItems,
  total,
  handleChange,
  history,
  user,
  userToggleFunc,
  userSelect,
  clearCart,
}) => {
  
  const [couponCode, setCouponCode] = useState();
  const [couponDiscount, setCouponDiscount] = useState();
  const [codeValue, setCodeValue] = useState();
  const [Data, setData] = useState([]);
  const [DisCountValue, setDiscountValue] = useState(0);

  async function getData() {
    const request = new Request("http://localhost:3030/coupon", {
      method: "GET",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "appliaction/json",
      }),
    });
    const res = await fetch(request);
    const data = await res.json();

    return data;
  }
  useEffect(() => {
    (async () => {

      const data = await getData();
      setData(data);
      
    })();
  }, [codeValue]);

  useEffect(() => {
    Data.filter(
      (el) => (el.couponCode.toString() === codeValue)).forEach((element) => setDiscountValue(element.couponDiscount));
  }, [couponCode, codeValue,DisCountValue, Data]);



  return (
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
      <div className="header-block product-price">
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
   <div className="coupon d-flex">
      <p className="text-coupon-code">優惠碼</p>
      <input
        className="code-input"
        type="text"
        name="coupon"
        // value="4EVER5566"
        // handleChange={handleChange}
        label="折扣碼"
        onChange={(e) => setCodeValue(e.target.value)}
      />
      
    </div>
    <div className="sum">${total}</div>
    <div className="discount">折扣:{DisCountValue} </div>
    <div className="total">總計: NT${total - DisCountValue}</div>
    <SubmitButton
      inverted={true}
      onClick={(e) => {
        if (!userSelect) {
          console.log(userSelect);
          e.preventDefault();
          userToggleFunc();
        } else {
          history.push("/orders/orderDelivery");
        }
      }}
    >
      確認訂單
    </SubmitButton>
  </div>
)};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleCartHidden, userToggleFunc }, dispatch);
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  userSelect: selectUserLogin,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
);
