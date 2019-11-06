import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import grubhubnew from '../image/grubhubnew.png';

import ROOT_URL from './const'
//Define a Login Component
class Ownersignup extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            restaurant_name: "",
            restaurant_zipcode: "",
            cuisine:"",
            authFlag: false,
            failuser: false
        }

    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }
    //username change handler to update state variable with the text entered by the user
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    submitOwnerSignup = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password,
            restaurant_name: this.state.restaurant_name,
            restaurant_zipcode: this.state.restaurant_zipcode,
            cuisine:this.state.cuisine
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/ownersignup`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    // <Redirect to="/home"> </Redirect>
                    this.setState({
                        authFlag: true
                    })
                    alert("Owner signup successful")
                }
                else if (response.status === 404) {
                    this.setState({ failuser: true })
                    
                }
            }).catch(err => {
                this.setState({ failuser: true })
            })
    }

    render() {
        //redirect based on successful login
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/ownerlogin" />
        }

        let userexists = null;
        if (this.state.failuser) {
            userexists = (
                <label style={{ color: "red" }}>User already exists .Please create account  </label>
            )
        }

        return (
            <div>
                {redirectVar}
                
                <div class="container" style={{ backgroundImage: `url(${grubhubnew})`, width: "100%", height: "100%" }}>

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2 style={{ fontWeight: "bold", color: "black" }}>Create your account</h2>
                            </div>

                            <div>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <label style={{ fontWeight: "normal" }}>First name</label>
                                    </div>
                                    <div class="col-sm-6">
                                        <label style={{ fontWeight: "normal" }}>Last name</label>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6">
                                    <input required onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" />
                                </div>
                                <div class="col-sm-6">
                                    <input onChange={this.inputChangeHandler} type="text" class="form-control" name="last_name" />
                                </div>
                            </div>


                            <div>
                                <label style={{ fontWeight: "normal" }}>Email</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="email" />
                            </div>

                            <div>
                                <label style={{ fontWeight: "normal" }}>Password</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="password" class="form-control" name="password" />
                            </div>

                            <div>
                                <label style={{ fontWeight: "normal" }}>Restaurant Name</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="restaurant_name" />
                            </div>

                            
                            <div>
                                <label style={{ fontWeight: "normal" }}>Zipcode</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="restaurant_zipcode" />
                            </div>

                            <div>
                                <label style={{ fontWeight: "normal" }}>Cuisine</label>
                            </div>

                            <div class="form-group">
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cuisine" />
                            </div>
                            <br></br>

                            <button type="submit" onClick={this.submitOwnerSignup} class="btn btn-primary">Create your account</button> <br></br><br></br>
                            {userexists}
                            <div style={{ textAlign: "center" }}>or</div>

                            <div className="heading1">

                            </div><br></br>

                            <div>
                                <button type="button" style={{ backgroundColor: "#3b5998", color: "white" }} className="btn btn-primary"> Log in with Facebook </button>
                            </div><br></br>

                            <div>
                                <button type="button" style={{ backgroundColor: "#4285f4", color: "white" }} className="btn btn-primary"> Log in with Google </button>
                            </div> <br></br>

                            <div className="textAligncenter">
                                <label >Have an account?<span style={{ color: "blue" }}><a href="/ownerlogin">Sign in</a></span></label>
                                {/* <div><Link to="/login">Sign in</Link></div> */}
                            </div><br></br>
                            <p style={{ fontSize: "10px" }}>By creating your Grubhub account, you agree to the <span style={{ color: "blue" }}>Terms of Use </span>and <span style={{ color: "blue" }}>Privacy Policy</span>  </p>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
//export Login Component
export default Ownersignup;