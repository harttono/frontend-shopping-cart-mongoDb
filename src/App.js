import React from 'react';
import './App.css';
import store from './store';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Link} from 'react-router-dom';
import HomeScreen from './Screen/HomeScreen';
import AdminScreen from './Screen/AdminScreen';
class App extends React.Component{

 render(){
  return (
   
    <Provider store={store}>
      <BrowserRouter>
        <div className='grid-container'>  
            <header>
                <Link to="/">React Shopping Cart</Link>
                <Link to="/admin">Admin</Link>
            </header>
          <main>
            <Route path="/admin" component={AdminScreen}/>
            <Route exact={true} path="/" component={HomeScreen}/>
          </main>
          <footer>All right is reserved.</footer>
        </div>
      </BrowserRouter>
  </Provider>

  );
 }
}

export default App;
