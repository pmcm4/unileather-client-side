
import Cart from "./pages/Cart";
import { Elements } from "@stripe/react-stripe-js"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import About from "./pages/About";
import { loadStripe } from "@stripe/stripe-js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Success from "./pages/Success";
import { useSelector } from "react-redux";
import Cat from "./pages/Cat";
import OrderSuccess from "./pages/OrderSuccess";
import PrivateRoute from "./components/PrivateRoute";
import User from "./pages/User";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Checkout from "./components/Checkout";
import Blog from "./pages/Blog";

const App = () => {
  const stripePromise = loadStripe(
    "pk_test_51Kme1GKuc9CD1grHLnx9NYLzZWjXpSUUOlUfcMPUYcA7lkfnYfAia6kVw8FrMvKe31cmLzGpVHvPU6Q5xlYWzJ3V00H6nU6hGn"
  )
  const user = useSelector(state=>state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
        {!user ? <Redirect to=""/> : <Cart/>}
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/orderSuccess">
          <OrderSuccess />
        </Route>
        <Route path="/login">
        {user ? <Redirect to="/"/> : <Login/>}
        </Route>
        <Route path="/register">
        {user ? <Redirect to=""/> : <Register/>}
        </Route>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/cat">
          <Cat />
        </Route>
        <PrivateRoute path="/success" component={Success} exact />
          <Route path="/user" component={User} exact>
                 {!user ? <Redirect to="/"/> : <User/>}
          </Route>
          <Route path="/user/orders" component={Orders} exact >
          </Route>
          <Route path="/user/order/:id" component={Order} exact >
          </Route>
          <Route path="/pay" exact>
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          </Route>
      </Switch>
    </Router>
  )
};

export default App;