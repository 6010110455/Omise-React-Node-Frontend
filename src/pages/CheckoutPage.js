import React, { useState } from "react";
import axios from "axios";

import ChekoutCreditCard from "../components/checkoutForm/omise-prebuilt-form/CheckoutCreditCard";
import CheckoutInternetBanking from "../components/checkoutForm/omise-prebuilt-form/CheckoutInternetBanking";

import "./CheckoutPage.css";

export function CartCheckoutPage({ cart, clearCart }) {
  const [stateCard, setStateCard] = useState({
    charge: undefined,
  });
  // console.log("stateCard", stateCard);
  // const [stateInternet, setStateInternet] = useState({
  //   charge: undefined,
  // });
  console.log("state after checkOut", stateCard);
  const createCreditCardCharge = async (email, name, amount, token) => {
    try {
      const res = await // Send a POST request
      axios({
        method: "post",
        url: "http://localhost:80/checkout-credit-card",
        data: {
          email,
          name,
          amount,
          token,
        },
        header: {
          "Content-Type": "application/json",
        },
      });
      const resData = res.data;
      if (resData) {
        setStateCard({ charge: resData });
        clearCart();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createInternetCharge = async (email, name, amount, token) => {
    try {
      const res = await // Send a POST request
      axios({
        method: "post",
        url: "http://localhost:80/checkout-internet-banking",
        data: {
          email,
          name,
          amount,
          token,
        },
        header: {
          "Content-Type": "application/json",
        },
      });
      const { authorizeUri } = res.data;
      if (authorizeUri) {
        console.log("authorizeUri", authorizeUri);
        clearCart();
        window.location.href = authorizeUri;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="own-form">
      <div className="cart__summary">
        <h2>Cart Summary</h2>
        <div className="cart-details">
          <h3>Total Amount: </h3>
          <h3>
            <span>{new Intl.NumberFormat().format(cart.amount / 100)} thb</span>
          </h3>
        </div>
      </div>
      <ChekoutCreditCard
        cart={cart}
        createCreditCardCharge={createCreditCardCharge}
      />
      <CheckoutInternetBanking
        cart={cart}
        createInternetCharge={createInternetCharge}
      />
      <div className="message">
        {stateCard.charge && (
          <div>
            <h4>Thank you for your payment with credit card.</h4>
            <p>
              Your payment amount is{" "}
              <span className="amount">
                {(stateCard.charge.amount / 100).toFixed()} Baht
              </span>
              , status:{" "}
              <span
                className={
                  stateCard.charge.status === "successful"
                    ? "success"
                    : stateCard.charge.status === "failed"
                    ? "failed"
                    : "pending"
                }
              >
                {stateCard.charge.status}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartCheckoutPage;
