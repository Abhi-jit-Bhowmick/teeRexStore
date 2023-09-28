import React, { useContext } from 'react'
import "./ProductCard.css"
import { ItemIsStock } from '../../Endpoint_AND_Function/ReUseableFunction'
import { CartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';
/*
const Button =(cart,id,handleAddtoCart,handleCheckOut)=>{
    let button;
    if (cart.length >=1){
        cart?.some((item)=>{
            if(item.id === id){
                button= <button type='click' onClick={handleAddtoCart}>Add to Cart</button>
            }else{
                button= (<button type='click' onClick={handleCheckOut}>Checkout</button>)
            }
        })
    }
    return button
    
}
*/

function ProductCard({ productInformation, handleAddtoCart }) {
    const { imageURL, name, gender, price, quantity, id } = productInformation;
    const { state } = useContext(CartContext)
    const nevigate = useNavigate()


    return (

        <>
            <div className='product-card-container'>
                <div className='product-image'>
                    <img src={imageURL} alt={name} />
                </div>
                <div className='product-details'>
                    {name} for {gender}
                    {/* <span>{color}</span> */}
                </div>
                <div className='product-card-footer'>
                    <div className='product-price'>
                        <h3>Rs.{price}</h3>
                        <div className='product-quantity'>
                            {
                                <ItemIsStock
                                    quantity={quantity}
                                    qty={0}
                                />
                            }
                        </div>
                    </div>
                    <div className="product_card_button">
                        {
                            state.cart.some((item) => item.id === id) ? (
                                <button type='click'
                                    onClick={() => nevigate("/checkout")}
                                >
                                    Checkout
                                </button>
                            ) : (
                                <button type='click' disabled={quantity === 0} onClick={(item) => handleAddtoCart(item)}>Add to Cart</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProductCard