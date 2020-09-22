import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER, FETCH_ORDERS,DELETE_ORDERS} from "../types"

export const createOrder = (order) => (dispatch) =>{
   fetch('/api/orders',{
       method:'POST',
       headers:{
           "Content-Type":"application/json"    
       },
       body:JSON.stringify(order)
   }).then( res => res.json())
     .then( data => {
         dispatch({
             type:CREATE_ORDER,
             payload:data
         })
         localStorage.clear("cartItems");
         dispatch({
             type:CLEAR_CART
         })
        console.log('data',data)
     })

}

export const clearOrder = () => (dispatch) =>{
    dispatch({type:CLEAR_ORDER})
}

export const fetchOrders = () => dispatch =>{
    fetch('/api/orders')
        .then( res => res.json())
        .then( data => {
            dispatch({
                type:FETCH_ORDERS,
                payload:data
            })
        })
}

export const deleteOrder = (id) => dispatch => {
    console.log('isi id',id)
    fetch(`/api/orders/${id}`,{
        method:'DELETE',
    })
     .then( res => res.json())
     .then(data => {
         const message = data.message;
        dispatch({
           type:DELETE_ORDERS,
           payload:message
        })
     })

}