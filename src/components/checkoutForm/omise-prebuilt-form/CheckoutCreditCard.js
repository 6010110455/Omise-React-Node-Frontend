import React, { useState, useEffect } from "react";
import Script from "react-load-script";

import "./Checkout.css";

export function Checkout({ cart, createCreditCardCharge }) {
  const [omiseCard, setOmiseCard] = useState(null);

  const handelLoadScript = () => {
    window.OmiseCard.configure({
      publicKey: "pkey_test_5qhieuxrhoil1x7mf51",
      currency: "thb",
      frameLabel: "BENZ",
      submitLabel: "จ่ายเลย",
      buttonLabel: "จ่ายด้วย Omise",
    });
    setOmiseCard(window.OmiseCard);
  };

  const creditCardconfig = () => {
    omiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethod: [],
    });
    omiseCard.configureButton("#checkout-button");
    omiseCard.attach();
  };

  const omiseCardHandler = () => {
    omiseCard.open({
      amount: cart.amount,
      submitFormTarget: "#checkout-form",
      onCreateTokenSuccess: (token) => {
        console.log("token", token);
        createCreditCardCharge(cart.email, cart.name, cart.amount, token);
      },
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    });
  };

  // useEffect(() => {
  //   if (omiseCard !== null) {
  //     creditCardconfig();
  //     omiseCardHandel();
  //   }

  //   return () => {};
  // }, [omiseCard]);

  console.log("omiseCard", omiseCard);

  return (
    <div className="own-form">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handelLoadScript} />
      <form>
        <button
          id="checkout-button"
          className="btn"
          type="button"
          onClick={(creditCardconfig, omiseCardHandler)}
        >
          Pay with Credit Card
        </button>
      </form>
    </div>
  );
}

export default Checkout;
