import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";

import { BsCartXFill } from "react-icons/bs";
import { ItemIsStock } from "../Endpoint_AND_Function/ReUseableFunction";

function CheckoutPage() {
  const { state, dispatch } = useContext(CartContext);

  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    setTotalPrice(
      state.cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0)
    );
  }, [state.cart]);

  const handleIncrement = (item) => {
    dispatch({
      type: "increment",
      payload: item,
    });
  };
  return (
    console.log(state.cart),
    (
      <>
        <div className="cart-container">
          {state.cart.length >= 1 ? (
            <ul className="cart-items">
              {state.cart?.map((item) => {
                return (
                  <li className="cart-item" key={item.id}>
                    <img src={item.imageURL} alt={item.name} />
                    <div className="product-details-cart">
                      <div className="name">{item.name}</div>
                      <div className="price">{item.price}</div>
                      {/* <div className='quantity-left'>
                          {item.quantity - item.qty === 0 ? <span className='out'>Out of Stock</span> :
                            `Only ${item.quantity - item.qty} ${item.quantity - item.qty === 1 ? "item" : "items"} are left`}
                        </div> */}
                      <div className="quantity-left">
                        <ItemIsStock quantity={item.quantity} qty={item.qty} />
                      </div>
                      <div className="quantity">
                        <button
                          disabled={item.qty === item.quantity}
                          className="inc-dec-btn"
                          onClick={() => handleIncrement(item)}
                        >
                          +
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => {
                            dispatch({
                              type: "decrement",
                              payload: item,
                            });
                          }}
                          className="inc-dec-btn"
                        >
                          -
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            dispatch({
                              type: "delete",
                              payload: item,
                            })
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
              <div className="total-price">
                <h3>Total Price : ${totalPrice}</h3>
              </div>
            </ul>
          ) : (
            <div className="empty-cart">
              <div className="empty-cart-emoji">
                <BsCartXFill />
              </div>
              <div className="empty-cart-text">Your Cart is Empty.....</div>
            </div>
          )}
        </div>
      </>
    )
  );
}

export default CheckoutPage;
