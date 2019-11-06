import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Reply from "./Reply";
// import Navbarwhite from "../component/Navbarwhite";
// import {ROOT_URL} from "../config";
import ROOT_URL from './const'

class BuyerMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            msg: [],
            owneremail: "",
            orderid: "",
            buyeremail: "",
            question: "",
            reply: ""

        }


    }
    // logout = () => {
    //     sessionStorage.removeItem("JWT");
    //     sessionStorage.removeItem("email");
    //     sessionStorage.removeItem("password")
    //   }

    //Get Reply
    componentWillMount() {
        console.log("in will mount");

        var email = sessionStorage.getItem("email");
        console.log(email)
        axios.get(`${ROOT_URL}/GetReply`, {
            params: {
                id: email
            }
        })
            .then((response) => {
                console.log(response);
                console.log(response.data);

                this.setState({
                    msg: response.data
                })
                console.log(response.data)
            });
    }


    render() {
        var replyerr;

        var msgbox = this.state.msg.map((msg) => {


            if (msg.question == "" || null) {
                replyerr = <div>
                    <img style={{ maxWidth: "360px" }} src={require("../image/message.png")} />
                </div>
            }


            return (

                <div className="col-md-7">

                    <div className="container" style={{ width: "530px" }}>
                        <ul className="col-md-8 list-group">

                            <h2> <span style={{ color: "red" }}>Message for : {msg.orderid}</span></h2>
                            {replyerr}
                            <div className="container" style={{ width: "366px", "marginLeft": "129px" }}>

                                <h4 ><span style={{ color: "red" }}>Question : {msg.question}</span></h4>
                            </div>

                            {msg.reply != undefined ? <div className="container darker" style={{ width: "394px", marginLeft: "1px" }}>
                                <h5>Owner : {msg.owneremail} </h5>
                                <h4>{msg.reply}</h4>

                            </div> : null}
                            <Reply data={msg} status={this.state.update} update={this.updateState} />
                        </ul>
                    </div>
                </div>

            )

        })

        return (

            <div className="container-fluid">
                
                <div id="login-container1" className="row" >
                    
                </div>

                {msgbox}

            </div>

        );
    }
}
export default BuyerMessage;
