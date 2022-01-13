import React, { Component } from "react";
import Script from "react-load-script";

import { publicKey } from "../../confidential/key";

import "./Checkout.css";

let OmiseCard;
export class CheckoutInternetBanking extends Component {
  handleLoadScript = () => {
    OmiseCard = window.OmiseCard;
    OmiseCard.configure({
      publicKey,
      currency: "thb",
      frameLabel: "INTERNET",
      submitLabel: "PAY NOW",
      buttonLabel: "Pay with Omise",
    });
  };

  internetConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "internet_banking",
      otherPaymentMethods: [
        "internet_banking_bay",
        "internet_banking_bbl",
        "internet_banking_ktb",
        "internet_banking_scb",
        "truemoney",
        "rabbit_linepay",
      ],
    });
    OmiseCard.configureButton("#internet");
    OmiseCard.attach();
  };

  omiseCardHandler = () => {
    const { cart, createInternetCharge } = this.props;
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: cart.amount,
      onCreateTokenSuccess: (token) => {
        console.log("token", token);
        createInternetCharge(cart.email, cart.name, cart.amount, token);
      },
      onFormClosed: () => {},
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    this.internetConfigure();
    this.omiseCardHandler();
  };
  render() {
    return (
      <div className="own-form">
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={this.handleLoadScript}
        />
        <form>
          <button
            id="internet"
            className="btn"
            type="button"
            disabled={this.props.cart.amount === 0}
            onClick={this.handleClick}
          >
            Pay with Internet Banking
          </button>
        </form>
      </div>
    );
  }
}

export default CheckoutInternetBanking;
