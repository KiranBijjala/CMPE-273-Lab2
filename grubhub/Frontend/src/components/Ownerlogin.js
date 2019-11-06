import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import ROOT_URL from './const'


//Define a Login Component
class Ownerlogin extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);   
        //maintain the state required for this component
        this.state = {
            email: "",
            password: "",
            authFlag: false,
            failuser: false,
            failcatch:false
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
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post(`${ROOT_URL}/ownerlogin`, data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    // <Redirect to="/Letseat"> </Redirect>
                    this.setState({
                        authFlag: true
                    })
                    sessionStorage.setItem("JWT",response.data.token);
                    sessionStorage.setItem('email',data.email);
                    sessionStorage.setItem('ownerdata', response.data.ownerdata);
                    window.location.reload();
                    alert("Owner Logged in succesfully")
                }
            }).catch(err=>{
                this.setState({failcatch:true})
            })
    }

    render() {
        //redirect based on successful login
       
        let redirectVar = null;
        if (this.state.authFlag) {
            redirectVar = <Redirect to="/menu" />
        }
        let faillabelcatch = null;
        if(this.state.failcatch){
            faillabelcatch=(
            <label style = {{color:"red"}}>Please check username and password</label>
            )
        }

        return (
            <div>
                {redirectVar}
                {faillabelcatch}
                <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2 style={{ fontWeight: "bold", color: "black" }}><span style={{color:"red"}}>GRUBHUB</span> FOR RESTAURANTS</h2>


                            </div>
                            <div class="form-group">
                                <div>Username or email address</div>
                                <input onChange={this.inputChangeHandler} type="text" class="form-control" autoFocus name="email" />
                            </div>
                            <div class="form-group">
                                <div>Password</div>
                                <input onChange={this.inputChangeHandler} type="password" class="form-control" name="password" />
                            </div><br></br>


                            <button type="submit" style={{backgroundColor:"red" , borderColor:"red"}} className="btn btn-primary" onClick={this.submitLogin} >Sign in</button> <br></br><br></br>
                            {faillabelcatch}
                            <div className = "textAligncenter">
                            <a href="#">Forgot Username</a><br></br>
                            <a href="#">Forgot Password</a>
                            </div>
                            <div>
                            <div style={{textAlign:"center"}}><Link to="/ownersignup">Create your account</Link></div>
                            </div> 
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
//export Login Component
export default Ownerlogin;

