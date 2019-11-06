import React, { Component } from 'react';
import '../App.css';
// import '../css/bootstrap.css';
import axios from 'axios';
import NavBar from './NavBar';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import Reply from "./Reply";
import ROOT_URL from './const'

class Askquestion extends Component{
    constructor(props) {
        // Call the constrictor of Super class i.e The Component
        super(props)
        // maintain the state required for this component
        this.state = {
          message: ""
        }
      }
      
    postMessage = (e) => {
        e.preventDefault();
           const data = {
            // owneremail : JSON.parse(sessionStorage.getItem("ownerdata"))[0].email,
            owneremail : sessionStorage.getItem("selectedRestaurant"),
            orderid :  sessionStorage.getItem("orderselected"),
            buyeremail : sessionStorage.getItem("email"),
            question :this.state.message,
          }
          console.log(data);
          //set the with credentials to true
          axios.defaults.withCredentials = true;
          //make a post request with the user data
          axios.post(`${ROOT_URL}/PostMessage`,data)
              .then(response => {
                  console.log("Status Code  is : ",response.status);
                  console.log(response.data);
                  if(response.status === 200){
                          console.log('Post successfully');
                          alert("Message Posted")
                          this.props.history.push('/BuyerMessage');
                  }else{
                      console.log('Post failed !!! ');
    
                  }
              });
    }

    render(){
        return (
            <div>
        <h3 style={{textAlign : "center"}} >Ask a question</h3>
        <input className="form-control" type = "textarea" value = {this.state.message} onChange = {(event) => {this.setState({ message : event.target.value })}}/>
      <br></br>
        <button onClick={this.postMessage} className="btn btn-primary" style={{width : "160px",marginLeft : "170px"}}>Send Message</button>
        </div>
        )
    }
}

export default Askquestion;