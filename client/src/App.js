import logo from './logo.svg';
import './App.css';
import NavbarComponentLogin from "./Components/Navbar/login"
import NavbarComponentMain from "./Components/Navbar/main"
import Login from "./view/Login/login"
import Register from "./view/Register/register"
import ExchangeRates from "./view/exchangeRates"
import ViewModify from "./view/viewModify"
import showTrends from "./view/showTrends"
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import './assets/css/index.css';
import { BrowserRouter as Router, Route , Switch, Link} from "react-router-dom";

const cookies = new Cookies();
function getcookie(string){
  return(cookies.get(string));
}
function App() {
  return (
    <div className="App">
      {getcookie("token")?
      <>
      <NavbarComponentMain/>
      <Router>
    <Switch>
      <Route exact path='/' component={ExchangeRates} />
      <Route path='/convert' component={ExchangeRates} />
      <Route path='/view' component={ViewModify} />
      <Route path='/show-trends' component={showTrends} />
    </Switch>
    </Router>
    </>
      :
      <>
      <NavbarComponentLogin/>
      <Router>
      <div className="container-fluid justify-content-center">
        <div className="container">

          <div className="row justify-content-center" >
          <div className="col-md-6 col-sm-12 col-lg-6">
      <div className="auth-wrapper" id="login-div">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </div>
      </div>
      </div>
    </div>
    </div>
    </Router>
      </>
  }
      
    </div>
  );
}

export default App;
