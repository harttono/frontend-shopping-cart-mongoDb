import React, { Component } from 'react'
import Products from '../components/Product';
import Filter from '../components/Filter';
import Cart from '../components/Cart';
export default class HomeScreen extends Component {
    render() {
        return (
            <div>
                <div className="content">
                    <div className="sidebar">
                        <Cart/>
                    </div>
                    <div className="main">
                        <Filter />
                        <Products/>
                    </div>
                </div>
         </div>
        )
    }
}
