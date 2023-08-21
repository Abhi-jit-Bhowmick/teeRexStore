import React, { useContext } from 'react'
import "./TopNav.css"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartContext } from '../../Context/CartContext';
import { Link } from 'react-router-dom';



function TopNav() {
  const { state } = useContext(CartContext)

  return (
    <div className='nav-container'>
      <div className='nav-inner'>
        <div className='logo'>
          <Link to="/" className='link'>Tee<span>Rex</span>Store</Link>
        </div>
        <div className='menus'>

          <div className='products'>
           <Link className='link' to="/">Products</Link> 
          </div>

          <div className='cart-icon'>
            {
              state.cart?.length ? <div className='cart-count'>{state.cart.length}</div> : null
            }

            <Link className="link" to="/checkout"><AiOutlineShoppingCart /></Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default TopNav