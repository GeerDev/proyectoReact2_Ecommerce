import React, { useState, useEffect} from 'react'
import { CssBaseline } from '@material-ui/core';

import { commerce } from './lib/commerce'

import { Navbar, Products, Cart } from './components';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
    const [productos, setProductos] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProductos = async () => {
        const { data } = await commerce.products.list();

        setProductos(data);
    };

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    
    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);

        setCart(item.cart);
    };

    const handleUpdateCartQty = async (lineItemId, quantity) => {
        const response = await commerce.cart.update(lineItemId, { quantity });
    
        setCart(response.cart);
      };
    
    const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);
    
        setCart(response.cart);
    };
    
    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();
    
        setCart(response.cart);
    };

    useEffect(() => {
        fetchProductos();
        fetchCart();
    }, []);

    console.log(productos)
    console.log(cart)

    return (
        <Router>
        <div style={{ display: 'flex' }}>
          <CssBaseline />
          <Navbar totalItems={cart.total_items} />
          <Switch>
            <Route exact path="/">
              <Products productos={productos} onAddToCart={handleAddToCart} handleUpdateCartQty />
            </Route>
            <Route exact path="/cart">
              <Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />
            </Route>
          </Switch>
        </div>
      </Router>
    )
}

export default App;