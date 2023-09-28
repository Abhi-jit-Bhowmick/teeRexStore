import React, { useContext, useEffect, useState } from 'react'
import { apicall } from '../Endpoint_AND_Function/Endpoint';
import {
    initialProductsState,
    makeArrayByProperty,
    initialFilterCheckBox,
} from '../Endpoint_AND_Function/ReUseableFunction';
import SideNav from '../Components/SideNav/SideNav';
import ProductCard from '../Components/ProductCard/ProductCard';
import { CartContext } from '../Context/CartContext';
import SearchBar from '../Components/SearchBar/SearchBar';
import { BsEmojiNeutral } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';






function ProductPage() {
    const [products, setProducts] = useState(initialProductsState);
    const [filterCheckBox, setFilterCheckBox] = useState(initialFilterCheckBox)
    const [filterProducts, setFilterProducts] = useState([])
    const [clickFilter, setclickfilter] = useState(false)
    const { dispatch } = useContext(CartContext)

    const handleSearch = (e) => {
        setFilterCheckBox({
            ...filterCheckBox,
            searchInput: e.target.value
        })
    }

    const handleCheckBox = (e) => {
        let newItems = [...filterCheckBox[e.target.name]]
        if (e.target.checked) {
            newItems = [...filterCheckBox[e.target.name], e.target.value]
        } else {
            newItems.splice(filterCheckBox[e.target.name].indexOf(e.target.value), 1)
        }
        setFilterCheckBox({ ...filterCheckBox, [e.target.name]: newItems })
    }

    const handleAddtoCart = (item) => {
        dispatch({
            type: "addToCart",
            payload: item
        })

    }


    const filterEdItem = () => {
        let filtered_Products = products.allProducts;

        const searchItem = filterCheckBox.searchInput.toLowerCase();
        const searchAttributes = ['color', 'gender', 'name', 'price'];
        if (filterCheckBox.searchInput) {
            filtered_Products = filtered_Products.filter((item) =>
                searchAttributes.some((key) => {
                    const property = item[key];
                    if (typeof (property) === 'string') {
                        return property.toLowerCase().includes(searchItem);
                    } else if (typeof property === 'number') {
                        return property.toString().toLowerCase().includes(searchItem);
                    }
                    return false;
                })
            );
        }

        if (filterCheckBox.color.length >= 1) {
            filtered_Products = filtered_Products.filter((item) => {
                return filterCheckBox.color.includes(item.color)
            })
        }
        if (filterCheckBox.gender.length >= 1) {
            filtered_Products = filtered_Products.filter((item) => {
                return filterCheckBox.gender.includes(item.gender)
            })
        }
        if (filterCheckBox.type.length >= 1) {
            filtered_Products = filtered_Products.filter((item) => {
                return filterCheckBox.type.includes(item.type)
            })
        }
        if (filterCheckBox.price.length >= 1) {


            // if (filterState.priceRange.length) {
            //     filteredItems = filteredItems.filter((item) => {
            //       const itemPrice = item.price;
            //       return filterState.priceRange.some(
            //         (range) => {
            //           const { minValue, maxValue } = JSON.parse(range)
            //           return itemPrice >= minValue && itemPrice <= maxValue
            //         }
            //       );
            //     });
            //   }




            // eslint-disable-next-line
            filterCheckBox.price.some((item) => {
                if (item === "0 - Rs.250") {
                    filtered_Products = filtered_Products.filter((p) => {
                        return p.price > 0 && p.price <= 250
                    })

                } if (item === "Rs.251 - 450") {
                    filtered_Products = filtered_Products.filter((p) => {
                        return p.price > 250 && p.price <= 450
                    })

                } if (item === "Rs.450") {
                    filtered_Products = filtered_Products.filter((p) => {
                        return p.price >= 451
                    })
                }
            })
        }
        setFilterProducts(filtered_Products)
    }



    useEffect(() => {
        apicall()
            .then((res) => {
                setProducts({
                    ...products,
                    allProducts: res.data,
                    color: makeArrayByProperty(res.data, "color"),
                    gender: makeArrayByProperty(res.data, "gender"),
                    type: makeArrayByProperty(res.data, "type"),
                })
                setFilterProducts(res.data)
            })
            .catch((error) => {
                console.log("ERROR::", error.message)
            })
        localStorage.clear()
    },
        // eslint-disable-next-line
        []);

    useEffect(() => {
        filterEdItem()
        // eslint-disable-next-line
    }, [filterCheckBox])

    return (
        // console.log("FILTERCHECKBOX::", filterCheckBox),
        // console.log("FILTERPRODUCTS::", filterProducts),
        <>
            <SideNav
                className={clickFilter ? "filter-clicked" : ""}
                products={products}
                handleCheckBox={(e) => handleCheckBox(e)}
            />

            <div className='home-container'>
                <div className='search-bar-container'>
                    <SearchBar
                        inputValue={filterCheckBox.searchInput}
                        handleSearch={(e) => handleSearch(e)}
                    />
                    <FiSearch className='search-icon' />
                    <FaFilter
                        className='filter'
                        onClick={() => setclickfilter(!clickFilter)}
                    />

                </div>
                <div className="home-inner">
                    {filterProducts.length >= 1 ?
                        filterProducts?.map(item =>
                        (
                            <ProductCard
                                key={item.id}
                                productInformation={item}
                                handleAddtoCart={() => handleAddtoCart(item)}
                            />
                        )
                        ) : (
                            <div className='home-inner-no-product-found'>
                                <div className='no-product-emoji'><BsEmojiNeutral /></div>
                                <div className='no-product-found'>
                                    No Product Found
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>

        </>

    )
}

export default ProductPage