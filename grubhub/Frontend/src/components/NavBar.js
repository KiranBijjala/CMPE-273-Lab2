import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../NavBar.css';
import Grubhub from '../image/Grubhub.png'
//create the Navbar Component
class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' })
        sessionStorage.clear();
    }

    render() {
        let navLogin = null;
        // if (cookie.load('cookie')) {
        //     console.log("Able to read cookie");

        if (sessionStorage.getItem("JWT") != null) {
             console.log("Token AUthorization Successful");
            navLogin = (
                <nav style={{ backgroundColor: "yellow" }} class="navbar navbar-default">
                    <a class="navbar-brand" style={{ color: "red", fontFamily: "impact", fontWeight: "bold", fontSize: "25px" }} href="/home">GRUBHUB</a>

                    <ul class="nav navbar-nav navbar-right">
                        {/* <li><Link to="/userprofile" ><span class="glyphicon glyphicon-user"></span>Account</Link></li> */}
                        <li><Link to="/" onClick={this.handleLogout}><span class="glyphicon glyphicon-log-out"></span>Logout</Link></li>

                    </ul>
                </nav>


            );

        } else {
            navLogin = (
                <nav style={{ backgroundColor: "yellow" }} class="navbar navbar-default">

                    <a class="navbar-brand" style={{ color: "red", fontFamily: "impact", fontWeight: "bold", fontSize: "25px" }} href="/">GRUBHUB</a>

                    <ul class="nav navbar-nav navbar-right">
                        <li><Link to="/ownerlogin"><span class="glyphicon glyphicon-log-in"></span> Owner Login</Link></li>
                        <li><Link to="/login"><span class="glyphicon glyphicon-log-in"></span> Login</Link></li>
                    </ul>
                </nav>
            )
        }

        // let redirectVar = null;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/home" />
        // }

        let redirectVar  = null
    if (sessionStorage.getItem('JWT' != null)){ 
      redirectVar  = <Redirect to='/home'/>
    }

        return (
            <div>
                {navLogin}
                
            </div>
        )
    }
}

export default NavBar;