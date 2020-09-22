import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import {connect} from 'react-redux';
import {removeFromCart} from '../Actions/cartAction';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import {createOrder,clearOrder} from '../Actions/orderAction'
class Cart extends Component {
    constructor(props){
        super(props)
        this.state={
            showCheckout:false,
            name:"",
            email:"",
            address:""
        }
    }
    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name:this.state.name,
            email:this.state.email,
            address:this.state.address,
            cartItems:this.props.cartItems,
            total:this.props.cartItems.reduce( (a,b) => a+b.price*b.count,0)
        }
        this.props.createOrder(order)
    }
    closeModal = () => {
        this.props.clearOrder();
        window.location.reload();
    }

    render() {
        const {cartItems,order} = this.props;
        return (
            <div>
                {
                !cartItems ? null : cartItems.length === 0 ? 
                <div className="cart cart-header">Cart Is Empty</div> : 
                <div className="cart cart-header">You Have {" "}{cartItems.length} in the cart</div>
                }
                {
                   order && (
                    <Modal isOpen={true} onRequestClose={this.closeModal} style={modalStyles}>
                        <Zoom>
                           <div className="order-details">
                           <button className="close-modal" onClick={this.closeModal}>x</button> 
                               <h3 className="success-message">Your order has been placed</h3>
                               <h2>order {order._id}</h2>
                               <ul>
                                   <li>
                                       <div>Name </div>
                                        <div>:{" "}{order.name}</div>
                                   </li>
                                   <li>
                                       <div>Email </div>
                                        <div>:{" "}{order.email}</div>
                                   </li>
                                   <li>
                                       <div>Total </div>
                                        {cartItems.length !== 0 ? <div>:{" "}{formatCurrency(order.total)}</div> : null}
                                   </li>
                                   <li>
                                       <div>Date </div>
                                        <div>:{" "}{order.createdAt}</div>
                                   </li>
                                   <li>
                                      {cartItems.length !== 0 ? 
                                       <div>
                                        <div>Cart items X {order.cartItems.reduce( (a,b) => a+b.count,0)}</div>
                                         <div>{order.cartItems.map( x => (
                                            <div>
                                              -{" "}{x.title}
                                            </div> 
                                        ))}</div>
                                       </div>: 
                                     null}
                                   </li>
                               </ul>
                           </div>
                        </Zoom>
                    </Modal>) 
                }
                <div>
                    <div className="cart">
                        <Fade right cascade>
                            <ul className="cart-items">
                                {cartItems.map( (item) => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title}></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count} {" "}
                                                <button className="small-button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>   
                        </Fade>
                    </div> 
                    { cartItems.length !== 0 && 
                    (<div>
                        <div className="cart">    
                        <div className="total">
                            <div>
                                Total:{" "}{formatCurrency(cartItems.reduce( (a,b) => a+b.price*b.count,0))}
                            </div>
                            <button className="button primary" onClick={ () => { this.setState({showCheckout:true})}}>Proceed</button>
                        </div>
                        </div>
                        {this.state.showCheckout && (
                            <div className="cart">
                                <form onSubmit={this.createOrder}>
                                    <Fade left cascade>
                                        <ul className="form-container">
                                            <li>
                                                <label>Email : </label>
                                                <input type="email" name="email" required={true} onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <label>Name : </label>
                                                <input type="text" name="name" required={true}  onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <label>Address : </label>
                                                <input type="text" name="address" required={true}  onChange={this.handleInput}></input>
                                            </li>
                                            <li>
                                                <button className="button primary full-width" type="submit">Submit</button>
                                            </li>
                                        </ul>
                                    </Fade>
                                </form>
                            </div>
                        )}
                    </div>) 
                    }   
                </div>
            </div>
        )
    }
}
export default connect( (state) =>({
    order:state.order.order,
    cartItems:state.cart.cartItems
}),
  {
    removeFromCart,
    createOrder,
    clearOrder
  }
)(Cart);
const modalStyles = {
    content : {
    width:'50rem',
    background:'rgba(0,0,0,.1)',
    top: '50%',
    left: '50%',
    right: 'auto',                 
    bottom: 'auto',                
    marginRight: '-50%',           
    transform: 'translate(-50%, -50%)',                           
    border:'0.2rem solid #c0c0c0'                
    }
};