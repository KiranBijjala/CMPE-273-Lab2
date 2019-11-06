import React, { Component } from 'react'
import axios from 'axios'
import '../App.css';
import '../css/Buyerprofile.css';
import cookie from 'react-cookies'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import {getOwnerProfile} from '../actions'
import {getUserImage} from '../actions'
import {menudetails} from '../actions'
import { connect } from 'react-redux'
import {Field, reduxForm} from 'redux-form';
import '../css/new.css';

import ROOT_URL from './const'
//Define a Login Component
class Ownerprofile extends Component {
    
    constructor(props) {
       
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            pic: '',
            email: "",
            restaurant_zipcode: "",
            restaurant_name: "",
            password: "",
            authFlag: false,
            failuser: false,
            cuisine:''
        }
    }

    componentWillMount () {
        // let path = '/Users/kirankumarbijjala/Documents/Lab2/grubhub/Backend/ownerprofile/Sankranthi.png';

        this.setState({
          authFlag: false,
          authFailed: false,
          pic: '',
          
        })
    
        let temp = sessionStorage.getItem('email');
        console.log(sessionStorage.getItem('email'));
        let data = { email: temp }


        this.props.getOwnerProfile({ params: data }, response => {
          console.log(response.data);
          sessionStorage.setItem('cuisine',response.data.cuisine);
        //   let owner = JSON.parse(sessionStorage.getItem('ownerdata'))
        //   let img = '/Users/kirankumarbijjala/Documents/Lab2/grubhub/Backend/public/profile/'+response.data.image
            this.setState({
              email: response.data.email,
              restaurant_name: response.data.restaurant_name,
              restaurant_zipcode: response.data.restaurant_zipcode,
              password: response.data.password,
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              cuisine: response.data.cuisine,
              pic:response.data.image
        })
        console.log(this.state.email);
        
        

        axios.post(`${ROOT_URL}/ownerimage`, data).then(response => {
                    console.log('Axios get:', response.data)
                    this.setState({
                        pic: 'data:image/png;base64, ' + response.data
                    })
                })

      })
      
    }

    uploadImage = e => {
        e.preventDefault()
        // var headers = new Headers();
        const formData = new FormData()
        

        let email = sessionStorage.getItem('email')
        
        formData.append('myImage', this.state.file, email)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios
            .post('/ownerprofile', formData, config)
            .then(response => {
                let data = { 'email': email }
                axios.post(`${ROOT_URL}/ownerimage`, data).then(response => {
                    window.location.reload();
                    console.log('Axios get:', response.data)
                    this.setState({
                        pic: 'data:image/png;base64, ' + response.data
                    })
                })
                
            })
            .catch(error => { })
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    imageChangeHandler = e => {
       
        this.setState({
            file: e.target.files[0]
        })
    }

    update = (e) => {
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: sessionStorage.getItem('email'),
            password: this.state.password,
            restaurant_name: this.state.restaurant_name,
            restaurant_zipcode: this.state.restaurant_zipcode,
            cuisine : this.state.cuisine
        }
        console.log(data);
       
        axios.defaults.withCredentials = true;
        
        axios.post(`${ROOT_URL}/ownerupdate`, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        first_name: response.data[0].first_name,
                        last_name: response.data[0].last_name,
                        password: response.data[0].password,
                        // email: response.data[0].email,
                        phone: response.data[0].phone, 
                        restaurant_name: response.data[0].restaurant_name,
                        restaurant_zipcode: response.data[0].restaurant_zipcode,
                        cuisine:response.data[0].cuisine

                    });
                    alert("Profile Update Succefully");
                } else {
                    console.log('Change failed !!! ');

                }
            });
    }

    renderInput = ({ input, label, meta }) => {
        return (<div>
            <div htmlFor='email' style={{ color: 'black' }}>
                {label}
            </div>
            <input className="form-control" {...input} />
            {this.renderError(meta)}
        </div>);
    }

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (<label style={{ color: 'red' }}>{error}</label>)
        }


    }



    render() {
        let updatePic = null

        if (this.state.file !== '') {
            updatePic = (
                <button
                    type='submit'
                >
                    Update
        </button>
            )
        }
        //redirect based on successful login
        // let createlogin = null;

        // if (!cookie.load('cookie')) {
        //     createlogin = <Redirect to="/ownerlogin" />
        // }

        let redirectVar  = null
    if (sessionStorage.getItem('OwnerJWT' === null)){ 
      redirectVar  = <Redirect to='/ownerlogin'/>
    }


        let createlogin = null;
        if (this.state.authFlag) {
            createlogin = <Redirect to="/ownerlogin" />
        }

        return (
            <div>
                {createlogin}
                {redirectVar}
                <div className="row">
                    <div className="col-sm-2">
                        <div className="col-shift">
                            <h2>Your account</h2>
                            <ul class="nav flex-column">
                                <li className="new-change">
                                    <a className="nav-link active" href="/ownerprofile" >
                                        <span className="profilenew">Profile</span></a></li>
                                <li><a className="nav-link" href="#" >
                                    <span className="new" >Address and phone</span></a></li>
                                <li><a className="nav-link" href="/ownerrestaurantmenu" >
                                    <span className="new" >Restaurant Menu</span></a></li>
                                <li><a className="nav-link " href="/menu" >
                                    <span className="new" >Add Menu</span></a></li>
                                <li><a className="nav-link new" href="/restaurantpastorders" >
                                    <span className="new" >Past orders</span></a></li>
                                <li><a className="nav-link" href="/restaurantorders">
                                    <span className="new" >Upcoming orders</span></a></li>
                                    <li><a className="nav-link" href="/OwnerMessage" >
                                    <span className="new" >Message</span></a></li>
                                <li><a className="nav-link" href="#" >
                                    <span className="new" >Refer a friend</span></a></li>
                                <li><a className="nav-link" href="#" >
                                    <span className="new">Saved restaurants</span></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-10">
                        <div class="container">
                            <div class="login-form">
                                <div className="column-change">
                                    {/* <div class="main-div"> */}
                                    <div class="panel">
                                        <h2 style={{ fontWeight: "bold", color: "black" }}>Your account</h2>
                                    </div>

                                    <form onSubmit={this.uploadImage} enctype='multipart/form-data'>
                                        <div>
                                            <img
                                                src={this.state.pic}
                                                width='200'
                                                height='200'
                                            />

                                            <input

                                                type='file'
                                                onChange={this.imageChangeHandler}
                                                name='myImage'
                                                id='myImage'
                                            />
                                            <br />
                                        </div>
                                        <span class='Error' />
                                        {updatePic}
                                    </form>


                                    <div className="editname">
                                        <h3>Edit account</h3><br></br>
                                    </div>
                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>First name: {this.state.first_name}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="first_name" placeholder='Edit first name' />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Last name: {this.state.last_name} </div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" autoFocus name="last_name" placeholder='Edit Last name' />
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current password : ***** </div>
                                        <div className="boxwidth-change">
                                            <input
                                                onChange={this.inputChangeHandler}
                                                type="password"
                                                placeholder="Edit Password"
                                                class="form-control"
                                                name="password" />
                                        </div>
                                    </div>

                                    {/* <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Current Email: {this.state.email}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="email" placeholder='Edit Email' />
                                        </div>
                                    </div> */}


                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Restaurant Name: {this.props.owner.restaurant_name}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="restaurant_name" placeholder='Edit Restaurant name' />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}>Zip Code: {this.props.owner.restaurant_zipcode}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="restaurant_zipcode" placeholder='Edit Zipcode' />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div style={{ fontWeight: 'bold', fontSize: '18px' }}> Cuisine: {this.props.owner.cuisine}</div>
                                        <div className="boxwidth-change">
                                            <input onChange={this.inputChangeHandler} type="text" class="form-control" name="cuisine" placeholder='Edit Email' />
                                        </div>
                                    </div>

                                    <div className="wrapperbutton">
                                        <button type="submit" className="button-edit" onClick={this.update}>update</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div >



        )
    }
}
 
function mapStateToProps(state) {
    return {
      owner: state.owner
    };
  }
  
  export default connect( mapStateToProps , { getOwnerProfile: getOwnerProfile,getUserImage:getUserImage})(Ownerprofile);
  