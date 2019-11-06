import React, { Component } from 'react';
import '../App.css';
import '../css/bootstrap.css';
import axios from 'axios';
import NavBar from './NavBar';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Reply from "./Reply";
import ROOT_URL from './const'


class OwnerMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: [],
            owneremail: "",
            orderid: "",
            buyeremail: "",
            question: "",
            reply: "",
            writereply: "",
            update: "",
        };

    }

    componentWillMount() {

        var email = JSON.parse(sessionStorage.getItem("ownerdata"))[0].email;
        console.log(email);
        axios.get(`${ROOT_URL}/GetMessage`, {
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
                    {replyerr}
                    <div className="container" style={{ width: "530px" }}>
                        <ul className="col-md-8 list-group">

                            <h2><span style={{color: "blue"}}> Message for {msg.orderid}</span></h2>
                            <br></br>
                            
                            {/* <div className="container" style={{ width: "380px" }}> */}
                                <h2><span style={{color: "green"}}>Buyer : {msg.buyeremail} </span></h2>
                                <br></br>
                                <h2><span style={{color: "red"}}>Question : {msg.question}</span></h2>


                                <h2><span style={{color: "black"}}>Messages:</span></h2>
                            {/* </div> */}
                            <br></br>

                            {msg.reply != undefined ? <div className="container darker" style={{ width: "394px", marginLeft: "83px" }}>
                                <h4>{msg.reply}</h4>
                            </div> : null}

                            <Reply data={msg} status={this.state.update} update={this.updateState} />

                        </ul>
                    </div>
                </div>

            )

        })

        return (

            <div>

                    {msgbox}
                </div>

            // </div>
        )
    }
}
export default OwnerMessage;
