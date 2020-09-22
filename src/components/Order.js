import React, { Component } from 'react';
import {fetchOrders,deleteOrder} from '../Actions/orderAction';
import formatCurrency from '../util'
import {connect} from 'react-redux';
class Order extends Component {

    componentDidMount(){
        this.props.fetchOrders();
    }
    delete = (id) =>{
        this.props.deleteOrder(id)
    }
    render() {
        const {orders,order} = this.props;
        return !orders ? <div>No Data</div>:<div>
        <div className="orders">
            <h2>Orders</h2>
                {order && <div>{order}</div>}
            <table>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>DATE</td>
                        <td>TOTAL</td>
                        <td>NAME</td>
                        <td>EMAIL</td>
                        <td>ADDRESS</td>
                        <td>ITEMS</td>
                        <td>ACTIONS</td>
                    </tr>
                </thead>
                <tbody>
                    {
                      orders ?  orders.map((order) =>(
                    <tr key={order._id}> 
                        <td>{order._id}</td>
                        <td>{order.createdAt}</td>
                        <td>{formatCurrency(order.total)}</td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.address}</td>
                        <td>{order.cartItems.map((item) =>(
                                <div  key={order._id}>
                                    {item.count} {"x "}{item.title}
                                </div>
                            ))}
                        </td>
                        <td>
                            <div>
                                <button className="button primary" onClick={() => this.delete(order._id)}>DELETE</button>
                            </div>
                        </td>
                    </tr>
                        )): null
                    }
                </tbody>
            </table>
       </div>
   </div>                         
    }
}
export default connect(
    (state) =>({
        orders:state.order.orders,
        order:state.order.order
    }),{
        fetchOrders,
        deleteOrder
    }
)(Order);