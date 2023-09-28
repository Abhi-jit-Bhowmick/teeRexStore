import React from 'react'
import "./SideNav.css"
import CheckBox from '../Filter/CheckBox'

function SideNav({ handleCheckBox, products, className }) {
    const { color, gender, type, price } = products
    return (
        // console.log(color),
        <div className={`side-nav-container ${className}`}>
            <div className='side-nav-inner'>
                <div className="side-nav-inner-block">
                    <h5>Color</h5>
                    {
                        color?.map((item) => {
                            return (
                                <CheckBox
                                    key={item}
                                    name="color"
                                    value={item}
                                    handleCheckBox={handleCheckBox}
                                />
                            )
                        })
                    }
                </div>


                {/* GENDER */}
                <div className="side-nav-inner-block">
                    <h5>Gender</h5>
                    {
                        gender?.map((item) => {
                            return (
                                <CheckBox
                                    key={item}
                                    name="gender"
                                    value={item}
                                    handleCheckBox={handleCheckBox}
                                />
                            )
                        })
                    }
                </div>

                {/* PRICE */}
                <div className="side-nav-inner-block">
                    <h5>Price</h5>
                    {
                        price?.map((item) => {
                            return (
                                <CheckBox
                                    key={item}
                                    name="price"
                                    value={item}
                                    handleCheckBox={handleCheckBox}
                                />
                            )
                        })
                    }
                </div>

                {/* TYPE */}
                <div className="side-nav-inner-block">
                    <h5>Type</h5>
                    {
                        type?.map((item) => {
                            return (
                                <CheckBox
                                    key={item}
                                    name="type"
                                    value={item}
                                    handleCheckBox={handleCheckBox}
                                />
                            )
                        })
                    }
                </div>

            </div>
        </div >
    )
}

export default SideNav