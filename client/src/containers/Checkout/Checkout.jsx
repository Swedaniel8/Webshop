import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';

import { IoIosArrowBack } from 'react-icons/io'

import { ProductCardCheckout, CheckoutForm } from '../../components/index'

import './Checkout.css'
/* 


const Checkout = () => {
  const navigate = useNavigate();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
  const dispatch = useDispatch()
  const selectorLength = useSelector(state => state.cart.length)
  const selectorCart = useSelector(state => state.cart.cartInfo)
  const [cartArray, setCartArray] = useState([])
  const [totprice, setTotPrice] = useState(0)
  const [clientSecret, setClientSecret] = useState("");
  const [clientId, setClientId] = useState("");

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#87a6c5',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };


  // SETS TOTAL COST AND WHATS IN THE CART WHEN SITE IS LOADED //
  // IF CART IS UPDATED => CHECKS IF WE HAVE AN ID AND UPDATES TOTAL AMOUNT //
  useEffect(()=>{    
    var tempCost = 0;
    setCartArray(selectorCart)

    selectorCart.forEach(item => {
      tempCost += item.price * item.quantity
    })
    console.log("selector: ",tempCost)
    setTotPrice(tempCost)

    // IF CLIENT ID EXIST AND CARTS QUANTITY CHANGES, UPDATE AMOUNT //
     if(clientId){
      const items = []
      selectorCart.forEach(item => {
        items.push({_id:item["_id"],qty:item.quantity})
      })
      
      // Update PaymentIntent as soon as the page loads
      fetch("http://localhost:5000/update-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({items, clientId}),
      })
        .then((res) => {
          //console.log("res.json(): ",res)
        return res.json()}
        )
        .then((data) => {
          //console.log("data: ",data)
          if(data.id) setClientId(data.id)
          return setClientSecret(data.clientSecret)});
      } 
  },[selectorLength,selectorCart])


  // CREATES PAYMENT INTENT AND SENDS IT TO SERVER //
  useEffect(() => {
    const items = []
    selectorCart.forEach(item => {
      items.push({_id:item["_id"],qty:item.quantity})
    })
    
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({items}),
    })
      .then((res) => {
        //console.log("res.json(): ",res)
       return res.json()}
      )
      .then((data) => {
        //console.log("data: ",data)
        if(data.id) setClientId(data.id)
        return setClientSecret(data.clientSecret)});
  }, []);



  return (
    <div className='container__checkout'>
      <div className='checkout__home' onClick={() => navigate(-1)}>
        <IoIosArrowBack id="react-icon-back" /> Return
      </div>      
      <div className='checkout__cart'>
        <h4>Pay Wasa</h4>
        <h1>{totprice} SEK</h1>
        <div className='checkout__cart__info'>
        {cartArray.length && cartArray.map((item,i)=>{
            return <ProductCardCheckout productsInfo={item} key={i}/>
          })}
          <div className='checkout__cart__info_shipping-price'>
            <div className='cart__price'><p>SubTotal</p><p>55 SEK</p></div>
            <div className='cart__price cart__shipping'>
              <p>Shipping<p>FREE</p></p>
              <p>FREE</p>
            </div>
            <div><p>Total due</p><p>{totprice} SEK</p></div>
          </div>
        </div>
      </div>
      
      <div className='checkout__form'>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
    </div>
  )
}

export default Checkout */






const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function Checkout() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}