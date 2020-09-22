import {createStore,compose,applyMiddleware, combineReducers}  from 'redux';
import thunk from 'redux-thunk';
import {productsReducer} from './Reducers/productReducer';
import {cartReducer} from './Reducers/cartReducers';
import { orderReducer } from './Reducers/orderReducer';

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(combineReducers({
   products:productsReducer,
   cart:cartReducer,
   order:orderReducer
}),
initialState,
composeEnhancer(applyMiddleware(thunk))
);


export default store;