import React from 'react'
import "./CheckBox.css"

function CheckBox({name, value, handleCheckBox }) {
    return (
        <div className="checkbox">
            <label>
                {value}
            </label>
            <input type='checkbox' name={name} value={value} onClick={(e) => handleCheckBox(e)} />

        </div>
    )
}

export default CheckBox